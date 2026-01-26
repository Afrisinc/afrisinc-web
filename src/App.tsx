import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Media from "./pages/Media";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardProducts from "./pages/dashboard/Products";
import DashboardUsers from "./pages/dashboard/Users";
import DashboardMedia from "./pages/dashboard/Media";
import DashboardNotifications from "./pages/dashboard/Notifications";
import DashboardSettings from "./pages/dashboard/Settings";
import AIContent from "./pages/dashboard/AIContent";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/media" element={<Media />} />
              <Route path="/products" element={<Products />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Dashboard Routes - Protected */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardOverview />} />
                <Route path="ai-content" element={<AIContent />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="users" element={<DashboardUsers />} />
                <Route path="media" element={<DashboardMedia />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
