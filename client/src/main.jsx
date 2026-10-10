import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SettingsProvider } from "./context/SettingsContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <BookingProvider>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: "12px",
                    background: "#1f2937",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "12px 16px",
                  },
                  success: {
                    iconTheme: {
                      primary: "#14b8a6",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />
            </BookingProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);