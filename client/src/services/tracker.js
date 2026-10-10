// client/src/services/tracker.js
import api from "./api";

/* ---------------------------------------------
   Session ID — persists for the browser tab
--------------------------------------------- */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("cg_session");
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("cg_session", sessionId);
  }
  return sessionId;
};

/* ---------------------------------------------
   Core tracker — fire and forget
--------------------------------------------- */
export const track = async (eventType, data = {}) => {
  try {
    await api.post("/analytics/events", {
      eventType,
      sessionId: getSessionId(),
      page: window.location.pathname + window.location.search,
      ...data,
    });
  } catch (err) {
    // Silent fail — analytics must NEVER break the app
  }
};

/* ---------------------------------------------
   Convenience helpers
--------------------------------------------- */
export const trackPageView = (page) =>
  track("page_view", { page });

export const trackBookClick = (pkg) =>
  track("book_click", {
    packageId: pkg?._id,
    packageTitle: pkg?.title,
    metadata: {
      price: pkg?.discountPrice || pkg?.price,
      location: pkg?.location,
    },
  });

export const trackWhatsAppClick = () =>
  track("whatsapp_click");

export const trackSearch = (query) =>
  track("search", { metadata: { query } });

export const trackFilterApply = (filters) =>
  track("filter_apply", { metadata: filters });