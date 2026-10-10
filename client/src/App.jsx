import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
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