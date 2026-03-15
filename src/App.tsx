import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Media from "./pages/Media";
import ArticlesPage from "./pages/media/Articles";
import ArticleDetail from "./pages/media/ArticleDetail";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Auth Pages
import Callback from "./pages/auth/Callback";

// Dashboard Pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardProducts from "./pages/dashboard/Products";
import VPNManagement from "./pages/dashboard/VPNManagement";
import DashboardUsers from "./pages/dashboard/Users";
import DashboardMedia from "./pages/dashboard/Media";
import DashboardNotifications from "./pages/dashboard/Notifications";
import DashboardSettings from "./pages/dashboard/Settings";
import AIContent from "./pages/dashboard/AIContent";



// Platform Admin Pages
import PlatformOverview from "./pages/platform/Overview";
import PlatformUsers from "./pages/platform/Users";
import PlatformAccounts from "./pages/platform/Accounts";
import PlatformOrganizations from "./pages/platform/Organizations";
import PlatformProducts from "./pages/platform/Products";
import PlatformGrowth from "./pages/platform/Growth";
import PlatformSecurity from "./pages/platform/Security";


import NotFound from "./pages/NotFound";
import TestComponent from "./pages/TestComponent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
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
                <Route path="/media/articles" element={<ArticlesPage />} />
                <Route path="/media/articles/:slug" element={<ArticleDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/auth/callback" element={<Callback />} />

              {/* Test Component Route */}
              <Route path="/testcomponent" element={<TestComponent />} />

              {/* Dashboard Routes - Protected */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardOverview />} />
                <Route path="ai-content" element={<AIContent />} />
                <Route path="products" element={<DashboardProducts />} />
                 <Route path="products/vpn" element={<VPNManagement />} />
                <Route path="users" element={<DashboardUsers />} />
                <Route path="media" element={<DashboardMedia />} />
                <Route path="notifications" element={<DashboardNotifications />} />
                <Route path="notifications/overview" element={<DashboardNotifications />} />
                <Route path="notifications/users" element={<DashboardNotifications />} />
                <Route path="notifications/accounts" element={<DashboardNotifications />} />
                <Route path="notifications/security" element={<DashboardNotifications />} />
                <Route path="settings" element={<DashboardSettings />} />

                 {/* Platform Admin Routes */}
                <Route path="platform" element={<PlatformOverview />} />
                <Route path="platform/users" element={<PlatformUsers />} />
                <Route path="platform/accounts" element={<PlatformAccounts />} />
                <Route path="platform/organizations" element={<PlatformOrganizations />} />
                <Route path="platform/products" element={<PlatformProducts />} />
                <Route path="platform/growth" element={<PlatformGrowth />} />
                <Route path="platform/security" element={<PlatformSecurity />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </HelmetProvider>
  </QueryClientProvider>
);

export default App;
