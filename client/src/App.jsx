import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================================
            PUBLIC WEBSITE
            /
            /packages
            /services
            /gallery
            etc.
        ================================= */}

        <Route path="/*" element={<AppRoutes />} />


        {/* ================================
            ADMIN PANEL
            /admin
            /admin/packages
            /admin/services
            etc.
        ================================= */}

        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;