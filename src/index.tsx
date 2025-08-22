import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "./contexts/AccountContext";
import { LandingPageDesktop } from "./screens/LandingPageDesktop";
import { SuperAdminDashboard, SuperAdminProfile } from "./screens/SuperAdmin";
import { SignIn } from "./screens/SignIn";
import { DemoLogin } from "./screens/DemoLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FeedbackContainer } from "./components/FeedbackContainer";
import { FeedbackDemo } from "./components/FeedbackDemo";


createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AccountProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPageDesktop />} />
          <Route path='/demo' element={<DemoLogin />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/feedback-demo" element={<FeedbackDemo />} />
          <Route 
            path="/super-admin" 
            element={
              <ProtectedRoute requiredRole="super_admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/super-admin-profile" 
            element={
              <ProtectedRoute requiredRole="super_admin">
                <SuperAdminProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <FeedbackContainer />
      </BrowserRouter>
    </AccountProvider>
  </StrictMode>,
);