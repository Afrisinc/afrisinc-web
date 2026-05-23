import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Target, Rocket, Globe, Users, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "4", label: "Departments" },
  { value: "10+", label: "Live Products" },
  { value: "15+", label: "Countries" },
  { value: "2020", label: "Founded" },
];

const accentColors = {
  terra: { bg: "hsl(22 88% 52% / 0.08)", text: "hsl(22 82% 46%)", border: "hsl(22 88% 52% / 0.2)" },
  forest: { bg: "hsl(158 42% 26% / 0.08)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.2)" },
  gold: { bg: "hsl(43 95% 52% / 0.10)", text: "hsl(38 80% 38%)", border: "hsl(43 95% 52% / 0.25)" },
  indigo: { bg: "hsl(240 40% 30% / 0.08)", text: "hsl(240 40% 52%)", border: "hsl(240 40% 30% / 0.2)" },
};

const values = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We push boundaries and embrace cutting-edge technology to solve real-world problems.",
    accent: "terra",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Built in Africa, trusted worldwide. We hold every product to the same standard as anyone, anywhere — no exceptions.",
    accent: "indigo",
  },
  {
    icon: Users,
    title: "People-Centric",
    description: "Building technology that empowers individuals and transforms communities.",
    accent: "forest",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Long-term thinking that balances business success with social responsibility.",
    accent: "gold",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "Afrisinc established with a vision for African tech excellence.",
  },
  {
    year: "2021",
    title: "Media Launch",
    description: "Launched our media division with news and content platforms.",
  },
  {
    year: "2022",
    title: "Tech Expansion",
    description: "Expanded into enterprise software and SaaS platforms.",
  },
  { year: "2023", title: "Global Reach", description: "Partnerships across 15+ countries and growing." },
  { year: "2024", title: "Innovation Hub", description: "Opened our flagship technology innovation center." },
];

const About = () => {
  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-background dot-grid grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

        <div className="container mx-auto px-6 pt-36 pb-28 relative z-10">
          <div className="max-w-4xl">
            <p className="line-accent mb-12 animate-fade-in">About Afrisinc</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                One Company.
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Four Big Bets.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              We don't believe great technology or great storytelling has a hometown. Built from Africa.
              Designed for the world.
            </p>

            {/* Stats */}
            <div className="mt-16 pt-10 border-t border-border animate-fade-up animation-delay-300">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x md:divide-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="md:px-8 md:first:pl-0">
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
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Purpose</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Driven by <span className="font-display italic text-gradient-primary">Vision.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Vision */}
            <div className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/25 hover:shadow-card-hover transition-all duration-300">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: accentColors.terra.bg,
                  border: `1px solid ${accentColors.terra.border}`,
                }}
              >
                <Eye className="w-5 h-5" style={{ color: accentColors.terra.text }} />
              </div>
              <h3 className="heading-subsection mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Africa's leading technology conglomerate, setting global standards in software
                innovation, digital media, and enterprise solutions. We envision a future where African
                technology talent and solutions power businesses worldwide.
              </p>
            </div>

            {/* Mission */}
            <div className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/25 hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary/10 border border-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="heading-subsection mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To build world-class technology products and platforms that solve real problems, create value
                for businesses and individuals, and showcase African excellence on the global stage. We commit
                to innovation, quality, and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Core Values</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                What We <span className="font-display italic text-gradient-primary">Stand For.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {values.map((value, index) => {
              const colors = accentColors[value.accent as keyof typeof accentColors];
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <value.icon className="w-5 h-5" style={{ color: colors.text }} />
                  </div>
                  <h3 className="heading-subsection mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Journey ──────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Our Journey</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Five Years. <span className="font-display italic text-gradient-primary">Growing Fast.</span>
              </h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="group relative flex gap-8 py-10 hover:bg-background/50 -mx-4 px-4 transition-all duration-300 rounded-xl"
              >
                {/* Left accent bar on hover — terra */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full"
                  style={{ backgroundColor: "hsl(var(--terra))" }}
                />

                {/* Year — large faint italic */}
                <span
                  className="font-display italic font-bold flex-shrink-0 w-24 leading-none mt-1"
                  style={{ fontSize: "48px", lineHeight: 1, color: "hsl(var(--terra) / 0.12)" }}
                  aria-hidden="true"
                >
                  {milestone.year}
                </span>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-foreground text-background grain relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 kente-border opacity-55" />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display italic font-bold text-background/[0.028] whitespace-nowrap leading-none"
            style={{ fontSize: "clamp(90px, 18vw, 200px)", letterSpacing: "-0.04em" }}
            aria-hidden="true"
          >
            TOGETHER
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-background/10">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/40 before:block before:w-6 before:h-px before:bg-background/40 before:flex-shrink-0">
                Work With Us
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background leading-[1.0]">
                Ready to Build <span className="font-display italic text-gradient-primary">Together?</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-background/50 text-sm leading-relaxed max-w-sm">
              Whether you're looking to partner, invest, or join our team — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="lg" className="group shadow-primary" asChild>
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-background/20 text-sm font-semibold text-background/65 hover:text-background hover:border-background/40 hover:bg-background/5 transition-all duration-200"
              >
                View Careers
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
