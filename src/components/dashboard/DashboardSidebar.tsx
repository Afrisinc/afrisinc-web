import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Users, Newspaper, Settings, Globe, Sparkles, LogOut, Shield, TrendingUp, Building2, Layers, CreditCard, BarChart3, ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  { id: "vpn", name: "VPN", icon: "🔒" },
  { id: "notify", name: "Notify", icon: "🔔" },
  { id: "articles", name: "Articles", icon: "📰" },
  { id: "platform", name: "Platform", icon: "⚙️" },
];

const mainItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Content", url: "/dashboard/ai-content", icon: Sparkles },
  { title: "Products", url: "/dashboard/products", icon: Package },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Media", url: "/dashboard/media", icon: Newspaper },
];

const platformItems = [
  { title: "Overview", url: "/dashboard/platform", icon: BarChart3 },
  { title: "Users", url: "/dashboard/platform/users", icon: Users },
  { title: "Accounts", url: "/dashboard/platform/accounts", icon: CreditCard },
  { title: "Organizations", url: "/dashboard/platform/organizations", icon: Building2 },
  { title: "Products", url: "/dashboard/platform/products", icon: Layers },
  { title: "Growth", url: "/dashboard/platform/growth", icon: TrendingUp },
  { title: "Security", url: "/dashboard/platform/security", icon: ShieldAlert },
];

const bottomItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<string>(() => {
    return localStorage.getItem("selectedProduct") || "platform";
  });

  useEffect(() => {
    localStorage.setItem("selectedProduct", selectedProduct);
  }, [selectedProduct]);

  const isActive = (url: string) => location.pathname === url;

  const handleSignOut = async () => {
    await signOut();
    // Redirect to landing page
    window.location.href = "/";
  };

  const getProductRoute = (productId: string) => {
    switch (productId) {
      case "vpn":
        return "/dashboard/products/vpn";
      case "notify":
        return "/dashboard/notifications";
      case "articles":
        return "/dashboard/media";
      case "platform":
      default:
        return "/dashboard/platform";
    }
  };

  const getProductPlatformRoutes = (productId: string) => {
    if (productId === "notify") {
      return [
        { title: "Overview", url: "/dashboard/notifications/overview", icon: BarChart3 },
        { title: "Users", url: "/dashboard/notifications/users", icon: Users },
        { title: "Accounts", url: "/dashboard/notifications/accounts", icon: CreditCard },
        { title: "Security", url: "/dashboard/notifications/security", icon: ShieldAlert },
      ];
    }

    return [
      { title: "Overview", url: "/dashboard/platform", icon: BarChart3 },
      { title: "Users", url: "/dashboard/platform/users", icon: Users },
      { title: "Accounts", url: "/dashboard/platform/accounts", icon: CreditCard },
      { title: "Growth", url: "/dashboard/platform/growth", icon: TrendingUp },
      { title: "Security", url: "/dashboard/platform/security", icon: ShieldAlert },
    ];
  };

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    navigate(getProductRoute(productId));
  };

  return (
    <Sidebar className="border-r border-border">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">A</span>
          </div>
          <span className="font-bold text-foreground">Afrisinc</span>
        </Link>
      </div>
      <SidebarContent>
        {/* Product Selector */}
        <SidebarGroup className="px-0">
          <div className="px-4 py-2 mb-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-2">SELECT PRODUCT</label>
            <Select value={selectedProduct} onValueChange={handleProductChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <span className="mr-2">{product.icon}</span>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SidebarGroup>

        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}>
                    <Link to={item.url}><item.icon className="w-4 h-4 mr-2" />{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Product-Specific Platform Routes */}
        {(selectedProduct === "platform" || selectedProduct === "notify") && (
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {selectedProduct === "platform" ? "Platform" : "Notify"} Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {selectedProduct === "platform" ? (
                platformItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}>
                      <Link to={item.url}><item.icon className="w-4 h-4 mr-2" />{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                getProductPlatformRoutes(selectedProduct).map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}>
                      <Link to={item.url}><item.icon className="w-4 h-4 mr-2" />{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        )}

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}>
                    <Link to={item.url}><item.icon className="w-4 h-4 mr-2" />{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-border space-y-2">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Globe className="w-4 h-4" /> Back to Website
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>
    </Sidebar>
  );
};
