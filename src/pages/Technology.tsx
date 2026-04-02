import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Cloud,
  Database,
  Shield,
  Zap,
  Code2,
  Cpu,
  Globe,
  Lock,
  BarChart3,
  Layers,
  Workflow,
  Server,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const accentColors = {
  terra:  { bg: "hsl(22 88% 52% / 0.08)",  text: "hsl(22 82% 46%)",  border: "hsl(22 88% 52% / 0.2)" },
  forest: { bg: "hsl(158 42% 26% / 0.08)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.2)" },
  gold:   { bg: "hsl(43 95% 52% / 0.10)",  text: "hsl(38 80% 38%)",  border: "hsl(43 95% 52% / 0.25)" },
  indigo: { bg: "hsl(240 40% 30% / 0.08)", text: "hsl(240 40% 52%)", border: "hsl(240 40% 30% / 0.2)" },
};

const platforms = [
  {
    icon: Cloud,
    name: "Afrisinc Cloud",
    description: "Enterprise-grade cloud infrastructure designed for African businesses. Scalable, secure, and optimized for regional compliance.",
    status: "Live",
    features: ["Auto-scaling", "Multi-region", "99.99% Uptime", "GDPR Compliant"],
    accent: "terra",
  },
  {
    icon: BarChart3,
    name: "Analytics Suite",
    description: "Real-time business intelligence and data analytics platform. Transform your data into actionable insights.",
    status: "Live",
    features: ["Real-time Dashboards", "Custom Reports", "Predictive Analytics", "API Access"],
    accent: "indigo",
  },
  {
    icon: Workflow,
    name: "WorkFlow Pro",
    description: "Enterprise workflow automation and process management. Streamline operations across your organization.",
    status: "Beta",
    features: ["Visual Builder", "500+ Integrations", "Custom Triggers", "Audit Logs"],
    accent: "forest",
  },
  {
    icon: Shield,
    name: "SecureID",
    description: "Identity and access management solution with biometric authentication for enhanced security.",
    status: "Live",
    features: ["Biometric Auth", "SSO Integration", "Role Management", "Compliance Tools"],
    accent: "gold",
  },
  {
    icon: Database,
    name: "DataVault",
    description: "Managed database service with automatic backups, scaling, and enterprise-grade security.",
    status: "Beta",
    features: ["Multi-DB Support", "Auto Backups", "Read Replicas", "Encryption"],
    accent: "terra",
  },
  {
    icon: Layers,
    name: "API Gateway",
    description: "Unified API management platform for building, deploying, and monitoring APIs at scale.",
    status: "Coming Soon",
    features: ["Rate Limiting", "Analytics", "Developer Portal", "SDK Generation"],
    accent: "indigo",
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "500+",   label: "Enterprise Clients" },
  { value: "15+",    label: "Countries Served" },
  { value: "24/7",   label: "Support Available" },
];

const Technology = () => {
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

            <p className="line-accent mb-12 animate-fade-in">Technology & Software</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Enterprise-Grade
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Software Platforms.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              World-class technology solutions built in Africa for the global market.
              Scalable, secure, and designed for the modern enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-fade-up animation-delay-300">
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Request Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <Link to="#platforms">
                  View Products
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section id="platforms" className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Platforms & Products</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Comprehensive{" "}
                <span className="font-display italic text-gradient-primary">Suite of Solutions.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((platform, index) => {
              const colors = accentColors[platform.accent as keyof typeof accentColors];
              return (
                <div
                  key={platform.name}
                  className="group relative rounded-2xl border border-border bg-card p-8 hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col min-h-[320px] animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon + status row */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                    >
                      <platform.icon className="w-5 h-5" style={{ color: colors.text }} />
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: platform.status === "Live" ? "hsl(var(--forest) / 0.15)" : platform.status === "Beta" ? "hsl(var(--primary) / 0.15)" : "hsl(var(--muted))",
                        color: platform.status === "Live" ? "hsl(var(--forest))" : platform.status === "Beta" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {platform.status}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 relative z-10">
                    {platform.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {platform.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 relative z-10"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="md:px-8 md:first:pl-0 animate-fade-up">
                <div
                  className="font-bold text-foreground tabular-nums tracking-tight font-display"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                Ready to Transform{" "}
                <span className="font-display italic text-gradient-primary">Your Business?</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-background/50 text-sm leading-relaxed max-w-sm">
              Get started with Afrisinc technology solutions today. Our team is ready to help you
              find the perfect fit for your organization.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-background/20 text-sm font-semibold text-background/65 hover:text-background hover:border-background/40 hover:bg-background/5 transition-all duration-200"
              >
                Try Dashboard
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </PublicLayout>
  );
};

export default Technology;
