import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Package,
  Sparkles,
  Check,
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Globe,
  CreditCard,
  ShoppingCart,
  MessageSquare,
  Calendar,
} from "lucide-react";

const accentColors = {
  terra: { bg: "hsl(22 88% 52% / 0.08)", text: "hsl(22 82% 46%)", border: "hsl(22 88% 52% / 0.2)" },
  forest: { bg: "hsl(158 42% 26% / 0.08)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.2)" },
  gold: { bg: "hsl(43 95% 52% / 0.10)", text: "hsl(38 80% 38%)", border: "hsl(43 95% 52% / 0.25)" },
  indigo: { bg: "hsl(240 40% 30% / 0.08)", text: "hsl(240 40% 52%)", border: "hsl(240 40% 30% / 0.2)" },
};

const products = [
  // {
  //   icon: Globe,
  //   name: "Afrisinc Commerce",
  //   tagline: "Complete e-commerce platform",
  //   description: "Full-featured e-commerce solution with payment processing, inventory management, and analytics built for African markets.",
  //   status: "Live",
  //   pricing: "From $49/month",
  //   features: [
  //     "Multi-currency support",
  //     "Local payment gateways",
  //     "Inventory management",
  //     "Order tracking",
  //     "Analytics dashboard",
  //     "Mobile-first design",
  //   ],
  //   accent: "terra",
  // },
  // {
  //   icon: MessageSquare,
  //   name: "Afrisinc Connect",
  //   tagline: "Customer engagement platform",
  //   description: "Unified communication platform for businesses to engage with customers across WhatsApp, SMS, email, and social media.",
  //   status: "Live",
  //   pricing: "From $29/month",
  //   features: [
  //     "Omnichannel messaging",
  //     "AI-powered chatbots",
  //     "Campaign management",
  //     "Customer analytics",
  //     "Team collaboration",
  //     "API integrations",
  //   ],
  //   accent: "indigo",
  // },
  // {
  //   icon: CreditCard,
  //   name: "Afrisinc Pay",
  //   tagline: "Payment infrastructure",
  //   description: "Accept payments from anywhere in Africa with support for mobile money, cards, bank transfers, and crypto.",
  //   status: "Beta",
  //   pricing: "2.5% + $0.25 per transaction",
  //   features: [
  //     "Mobile money integration",
  //     "Card processing",
  //     "Bank transfers",
  //     "Recurring payments",
  //     "Fraud detection",
  //     "Instant settlements",
  //   ],
  //   accent: "gold",
  // },
  // {
  //   icon: Calendar,
  //   name: "Afrisinc Schedule",
  //   tagline: "Booking & scheduling tool",
  //   description: "Smart scheduling solution for businesses. Manage appointments, meetings, and resources effortlessly.",
  //   status: "Coming Soon",
  //   pricing: "From $19/month",
  //   features: [
  //     "Online booking",
  //     "Calendar sync",
  //     "Automated reminders",
  //     "Resource management",
  //     "Customer portal",
  //     "Payment collection",
  //   ],
  //   accent: "forest",
  // },
];

const integrations = [
  // { name: "Stripe", logo: "💳" },
  // { name: "Flutterwave", logo: "🌊" },
  // { name: "Paystack", logo: "📦" },
  // { name: "Slack", logo: "💬" },
  // { name: "Shopify", logo: "🛒" },
  // { name: "Zapier", logo: "⚡" },
];

const Products = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-forest text-secondary-foreground";
      case "Beta":
        return "bg-primary text-primary-foreground";
      case "Coming Soon":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-background dot-grid grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

        <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
          <div className="max-w-4xl">
            <p className="line-accent mb-12 animate-fade-in">Digital Products</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Tools That Power
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Modern Business.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              A suite of digital products designed to help businesses grow, engage customers, and scale
              operations efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-fade-up animation-delay-300">
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="#products">
                  View Products
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section id="products" className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Products</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                {products.length === 0 ? (
                  <>
                    Currently Under{" "}
                    <span className="font-display italic text-gradient-primary">Development.</span>
                  </>
                ) : (
                  <>
                    Powerful Solutions{" "}
                    <span className="font-display italic text-gradient-primary">for Every Need.</span>
                  </>
                )}
              </h2>
              {products.length === 0 && (
                <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-lg">
                  We're crafting powerful tools to solve real business challenges. Get notified when our first
                  products launch by reaching out to our team.
                </p>
              )}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="mb-8">
                <Package className="w-16 h-16 text-muted-foreground mx-auto opacity-30 mb-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Coming Soon</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We're building transformative products to empower businesses worldwide. Exciting announcements
                are on the horizon.
              </p>
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Get Early Access
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-20">
              {products.map((product, index) => {
                const colors = accentColors[product.accent as keyof typeof accentColors];
                return (
                  <div
                    key={product.name}
                    className={`grid lg:grid-cols-2 gap-10 items-center animate-fade-up ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Text content */}
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                        >
                          <product.icon className="w-5 h-5" style={{ color: colors.text }} />
                        </div>
                        <span
                          className="px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            background:
                              product.status === "Live"
                                ? "hsl(var(--forest) / 0.15)"
                                : product.status === "Beta"
                                  ? "hsl(var(--primary) / 0.15)"
                                  : "hsl(var(--muted))",
                            color:
                              product.status === "Live"
                                ? "hsl(var(--forest))"
                                : product.status === "Beta"
                                  ? "hsl(var(--primary))"
                                  : "hsl(var(--muted-foreground))",
                          }}
                        >
                          {product.status}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-3">
                        {product.name}
                      </h2>

                      <p className="text-lg font-semibold text-primary mb-4">{product.tagline}</p>

                      <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                      <p className="text-lg font-bold text-foreground mb-8">{product.pricing}</p>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="default" size="lg" className="group shadow-primary" asChild>
                          <Link to="/contact">
                            Get Started
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="group">
                          Learn More
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>

                    {/* Features card */}
                    <div
                      className={`rounded-2xl border border-border bg-card p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                    >
                      <h4 className="text-lg font-bold text-foreground mb-6">Key Features</h4>
                      <ul className="space-y-4">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                            >
                              <Check className="w-3 h-3" style={{ color: colors.text }} />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Integrations ──────────────────────────────────────────────────── */}
      {integrations.length > 0 && (
        <section className="py-28 md:py-36 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
              <div>
                <p className="line-accent">Integrations</p>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                  Seamless <span className="font-display italic text-gradient-primary">Connections.</span>
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl mb-12">
              Connect with the tools you already use. Our products integrate with popular platforms to
              streamline your workflow.
            </p>

            <div className="flex flex-wrap gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={integration.name}
                  className="flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-2xl">{integration.logo}</span>
                  <span className="font-medium text-foreground">{integration.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-5 py-3 text-muted-foreground text-sm">
                <Sparkles className="w-4 h-4" />
                <span>+ 100 more</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-foreground text-background grain relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 kente-border opacity-55" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-background/10">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/40 before:block before:w-6 before:h-px before:bg-background/40 before:flex-shrink-0">
                Get Started
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background leading-[1.0]">
                Ready to Scale Your{" "}
                <span className="font-display italic text-gradient-primary">Business?</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-background/50 text-sm leading-relaxed max-w-sm">
              Choose the products that fit your business needs. Bundle multiple products for additional
              savings.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-background/20 text-sm font-semibold text-background/65 hover:text-background hover:border-background/40 hover:bg-background/5 transition-all duration-200"
              >
                View Pricing
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Products;
