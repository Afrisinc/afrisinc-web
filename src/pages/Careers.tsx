import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Laptop,
  Plane,
  GraduationCap,
  Coffee,
  Users,
  Globe,
  Zap,
} from "lucide-react";

const accentColors = {
  terra:  { bg: "hsl(22 88% 52% / 0.08)",  text: "hsl(22 82% 46%)",  border: "hsl(22 88% 52% / 0.2)" },
  forest: { bg: "hsl(158 42% 26% / 0.08)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.2)" },
  gold:   { bg: "hsl(43 95% 52% / 0.10)",  text: "hsl(38 80% 38%)",  border: "hsl(43 95% 52% / 0.25)" },
  indigo: { bg: "hsl(240 40% 30% / 0.08)", text: "hsl(240 40% 52%)", border: "hsl(240 40% 30% / 0.2)" },
};

const benefits = [
  { icon: Laptop,       title: "Remote-First",    description: "Work from anywhere in the world",      accent: "terra" },
  { icon: Heart,        title: "Health & Wellness", description: "Comprehensive health coverage",      accent: "forest" },
  { icon: Plane,        title: "Paid Time Off",   description: "Generous vacation policy",             accent: "gold" },
  { icon: GraduationCap, title: "Learning Budget", description: "$2,000 annual development fund",    accent: "indigo" },
  { icon: Coffee,       title: "Home Office",     description: "Equipment and setup allowance",        accent: "terra" },
  { icon: Users,        title: "Team Events",     description: "Regular retreats and meetups",         accent: "forest" },
];

const openings = [
  // {
  //   title: "Senior Backend Engineer",
  //   department: "Engineering",
  //   location: "Remote (Africa)",
  //   type: "Full-time",
  //   level: "Senior",
  // },
  // {
  //   title: "Product Manager",
  //   department: "Product",
  //   location: "Kigali, Rwanda",
  //   type: "Full-time",
  //   level: "Mid-Level",
  // },
  // {
  //   title: "Senior Frontend Engineer",
  //   department: "Engineering",
  //   location: "Remote (Global)",
  //   type: "Full-time",
  //   level: "Senior",
  // },
  // {
  //   title: "DevOps Engineer",
  //   department: "Infrastructure",
  //   location: "Remote (Africa)",
  //   type: "Full-time",
  //   level: "Mid-Level",
  // },
  // {
  //   title: "UX Designer",
  //   department: "Design",
  //   location: "Nairobi, Kenya",
  //   type: "Full-time",
  //   level: "Mid-Level",
  // },
  // {
  //   title: "Content Writer",
  //   department: "Media",
  //   location: "Remote (Global)",
  //   type: "Full-time",
  //   level: "Junior",
  // },
  // {
  //   title: "Sales Development Representative",
  //   department: "Sales",
  //   location: "Johannesburg, SA",
  //   type: "Full-time",
  //   level: "Entry Level",
  // },
  // {
  //   title: "Data Analyst",
  //   department: "Analytics",
  //   location: "Remote (Africa)",
  //   type: "Full-time",
  //   level: "Mid-Level",
  // },
];

const stats = [
  { value: "150+", label: "Team Members" },
  { value: "20+",  label: "Countries" },
  { value: "45%",  label: "Women in Tech" },
  { value: "4.8/5", label: "Employee Rating" },
];

const Careers = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
        return "bg-primary text-primary-foreground";
      case "Mid-Level":
        return "bg-forest text-secondary-foreground";
      case "Junior":
      case "Entry Level":
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

            <p className="line-accent mb-12 animate-fade-in">Careers</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Build the Future of
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                African Technology.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              Join a team of passionate innovators shaping the technology landscape.
              We offer meaningful work, competitive compensation, and global opportunities.
            </p>

            <Button
              variant="default"
              size="lg"
              className="group shadow-primary mt-10 animate-fade-up animation-delay-300"
              asChild
            >
              <a href="#positions">
                View Open Positions
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>
            </Button>

          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
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

      {/* ── Benefits ───────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Why Join Us</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                We Take Care of{" "}
                <span className="font-display italic text-gradient-primary">Our People.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => {
              const colors = accentColors[benefit.accent as keyof typeof accentColors];
              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 flex flex-col gap-4 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <benefit.icon className="w-5 h-5" style={{ color: colors.text }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────────────────────────────── */}
      <section id="positions" className="py-28 md:py-36 bg-muted/30">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Open Roles</p>
            </div>
            <div>
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full border ${
                  openings.length === 0
                    ? "bg-muted border-border text-muted-foreground"
                    : "bg-primary/10 border-primary/20 text-primary"
                }`}>
                  <span className="text-sm font-semibold">{openings.length} Opportunities Available</span>
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                {openings.length === 0 ? (
                  <>
                    We're{" "}
                    <span className="font-display italic text-gradient-primary">Hiring Soon.</span>
                  </>
                ) : (
                  <>
                    Join Our{" "}
                    <span className="font-display italic text-gradient-primary">Growing Team.</span>
                  </>
                )}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-lg">
                {openings.length === 0 ? (
                  "We're preparing exciting new roles across our teams. Check back soon or reach out to express your interest."
                ) : (
                  "We're actively hiring across engineering, design, product, and operations. Find the role that's perfect for you."
                )}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {openings.map((job, index) => (
              <div
                key={`${job.title}-${job.location}`}
                className="group relative rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-primary" />

                <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {job.title}
                      </h3>
                      <span
                        className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                        style={{
                          background: getLevelColor(job.level).includes("bg-primary")
                            ? "hsl(var(--primary) / 0.15)"
                            : getLevelColor(job.level).includes("bg-forest")
                              ? "hsl(var(--forest) / 0.15)"
                              : "hsl(var(--muted))",
                          color: getLevelColor(job.level).includes("bg-primary")
                            ? "hsl(var(--primary))"
                            : getLevelColor(job.level).includes("bg-forest")
                              ? "hsl(var(--forest))"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {job.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    className="group/btn shadow-primary flex-shrink-0"
                    asChild
                  >
                    <a href="/contact">
                      Apply Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnerships CTA ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-foreground text-background grain relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 kente-border opacity-55" />

        <div className="container mx-auto px-6 relative z-10">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-background/10">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/40 before:block before:w-6 before:h-px before:bg-background/40 before:flex-shrink-0">
                Explore
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background leading-[1.0]">
                More Ways to{" "}
                <span className="font-display italic text-gradient-primary">Work Together.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Partner card */}
            <div className="rounded-2xl bg-background/10 border border-background/20 p-8 hover:border-background/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-background mb-4">Partner With Us</h3>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                Looking for technology partnerships or collaborations?
                Let's explore opportunities together.
              </p>
              <Button variant="default" size="lg" className="group shadow-primary w-full sm:w-auto" asChild>
                <Link to="/contact">
                  Become a Partner
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Investment card */}
            <div className="rounded-2xl bg-background/10 border border-background/20 p-8 hover:border-background/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-background mb-4">Investment Opportunities</h3>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                Interested in investing in Africa's technology future?
                We'd love to hear from you.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="group border-border text-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 w-full sm:w-auto"
                asChild
              >
                <Link to="/contact">
                  Learn More
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

    </PublicLayout>
  );
};

// Import ArrowDown
import { ArrowDown } from "lucide-react";

export default Careers;
