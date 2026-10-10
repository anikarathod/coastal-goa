import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AnalyticsTracker from "./components/common/AnalyticsTracker";

function App() {
  return (
    <BrowserRouter>
      {/* Auto-tracks every page navigation */}
      <AnalyticsTracker />

      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route path="/*" element={<AppRoutes />} />

        {/* ADMIN PANEL */}
        <Route
          path="/pearlrathod/*"
          element={<AdminRoutes />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;