// server/routes/analyticsRoutes.js
import express from "express";
import AnalyticsEvent from "../models/AnalyticsEvent.js";

const router = express.Router();

/* =========================================================
   POST /api/analytics/events
   Log a single event (called from frontend)
   ========================================================= */
router.post("/events", async (req, res) => {
  try {
    const {
      eventType,
      page,
      packageId,
      packageTitle,
      serviceId,
      serviceTitle,
      metadata,
      sessionId,
    } = req.body;

    if (!eventType) {
      return res
        .status(400)
        .json({ success: false, message: "eventType is required" });
    }

    await AnalyticsEvent.create({
      eventType,
      page,
      packageId,
      packageTitle,
      serviceId,
      serviceTitle,
      metadata: metadata || {},
      sessionId,
      userAgent: req.headers["user-agent"],
      referrer: req.headers.referer,
      ip: req.ip,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Analytics event error:", err.message);
    // Always return success-ish so we never break UX
    res.status(200).json({ success: false });
  }
});

/* =========================================================
   GET /api/analytics/summary
   Overall stats (top cards in admin dashboard)
   ========================================================= */
router.get("/summary", async (req, res) => {
  try {
    const now = new Date();
    const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const prev30 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const [
      totalViews,
      viewsLast30,
      viewsPrev30,
      bookClicks,
      bookClicksLast30,
      whatsappClicks,
      uniqueSessions,
    ] = await Promise.all([
      AnalyticsEvent.countDocuments({ eventType: "page_view" }),
      AnalyticsEvent.countDocuments({
        eventType: "page_view",
        createdAt: { $gte: last30 },
      }),
      AnalyticsEvent.countDocuments({
        eventType: "page_view",
        createdAt: { $gte: prev30, $lt: last30 },
      }),
      AnalyticsEvent.countDocuments({ eventType: "book_click" }),
      AnalyticsEvent.countDocuments({
        eventType: "book_click",
        createdAt: { $gte: last30 },
      }),
      AnalyticsEvent.countDocuments({ eventType: "whatsapp_click" }),
      AnalyticsEvent.distinct("sessionId").then((ids) => ids.length),
    ]);

    // Growth % (views this month vs last month)
    const viewGrowth =
      viewsPrev30 === 0
        ? viewsLast30 > 0
          ? 100
          : 0
        : Math.round(((viewsLast30 - viewsPrev30) / viewsPrev30) * 100);

    res.json({
      success: true,
      totalViews,
      viewsLast30,
      viewGrowth,
      bookClicks,
      bookClicksLast30,
      whatsappClicks,
      uniqueSessions,
      conversionRate:
        totalViews > 0
          ? ((bookClicks / totalViews) * 100).toFixed(2)
          : "0.00",
    });
  } catch (err) {
    console.error("Analytics summary error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================================================
   GET /api/analytics/top-pages
   Top 10 most viewed pages
   ========================================================= */
router.get("/top-pages", async (req, res) => {
  try {
    const topPages = await AnalyticsEvent.aggregate([
      { $match: { eventType: "page_view", page: { $ne: null } } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({ success: true, topPages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================================================
   GET /api/analytics/top-packages
   Most clicked Book Now packages
   ========================================================= */
router.get("/top-packages", async (req, res) => {
  try {
    const topPackages = await AnalyticsEvent.aggregate([
      { $match: { eventType: "book_click", packageId: { $ne: null } } },
      {
        $group: {
          _id: "$packageId",
          title: { $first: "$packageTitle" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({ success: true, topPackages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================================================
   GET /api/analytics/daily-views?days=30
   Daily page views for the chart
   ========================================================= */
router.get("/daily-views", async (req, res) => {
  try {
    const days = Math.min(parseInt(req.query.days) || 30, 90);
    const from = new Date();
    from.setDate(from.getDate() - days);

    const daily = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: "page_view",
          createdAt: { $gte: from },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, daily });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================================================
   GET /api/analytics/recent
   Last 50 events (for a live feed)
   ========================================================= */
router.get("/recent", async (req, res) => {
  try {
    const events = await AnalyticsEvent.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("eventType page packageTitle serviceTitle createdAt sessionId");

    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;