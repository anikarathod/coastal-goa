// client/src/components/common/AnalyticsTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../services/tracker";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay so Helmet can set the page title first
    const t = setTimeout(() => {
      trackPageView(location.pathname + location.search);
    }, 100);
    return () => clearTimeout(t);
  }, [location]);

  return null;
};

export default AnalyticsTracker;