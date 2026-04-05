import { PublicLayout } from "@/components/layout/PublicLayout";
import { Mail, Phone, Calendar } from "lucide-react";

const Privacy = () => {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "data-collection", label: "Data Collection" },
    { id: "analytics", label: "Analytics & Tracking" },
    { id: "cookies", label: "Cookies" },
    { id: "rights", label: "Your Rights" },
    { id: "gdpr", label: "GDPR & Privacy Laws" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background dot-grid grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

        <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
          <div className="max-w-3xl">
            <p className="line-accent mb-12 animate-fade-in">Privacy & Transparency</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Your Data,
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Your Control.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-2xl mt-10 animate-fade-up animation-delay-200">
              We believe transparency builds trust. This page explains exactly how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[250px_1fr] gap-16 lg:gap-20">
            {/* ── Left: Table of Contents ── */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-6">On This Page</p>
                <nav className="space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm leading-relaxed text-muted-foreground hover:text-primary transition-colors duration-200 border-l-2 border-transparent hover:border-primary pl-3"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── Right: Content ── */}
            <div className="space-y-20">
              {/* ─ Introduction ─ */}
              <section id="intro" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Last updated: April 2026
                </p>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    Afrisinc ("we," "us," "our," or "Company") operates the Afrisinc website (the "Site"). This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                  </p>
                  <p>
                    We're committed to being transparent about what data we collect and why. If our practices ever change, we'll update this policy and notify you. Your privacy matters. Let's keep it simple.
                  </p>
                </div>
              </section>

              {/* ─ Data Collection ─ */}
              <section id="data-collection" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  What Data Do We Collect?
                </h2>
                <div className="space-y-8">
                  <div className="border-l-4 border-[hsl(22_88%_52%)] pl-6 py-2">
                    <h3 className="text-lg font-bold text-foreground mb-3">Information You Provide Directly</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      When you use our contact form, subscribe to our newsletter, or reach out to us, we collect:
                    </p>
                    <ul className="space-y-2 text-muted-foreground leading-relaxed">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Contact information:</strong> name, email, company, phone (if provided)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Message content:</strong> anything you choose to tell us</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Preferences:</strong> newsletter subscription opt-ins</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-[hsl(200_97%_45%)] pl-6 py-2">
                    <h3 className="text-lg font-bold text-foreground mb-3">Information Collected Automatically</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      When you visit our site, we automatically collect:
                    </p>
                    <ul className="space-y-2 text-muted-foreground leading-relaxed">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Usage data:</strong> pages visited, time spent, links clicked</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Device information:</strong> browser type, operating system, device type</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span><strong>Network data:</strong> IP address (anonymized), referrer source</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* ─ Analytics & Tracking ─ */}
              <section id="analytics" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Analytics & Tracking
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    We use Google Analytics 4 to understand how visitors interact with our site. This helps us improve the experience for everyone.
                  </p>
                  <p>
                    <strong className="text-foreground">What we track:</strong> page views, clicks, form submissions, scroll depth, and time spent on pages. We use this data to find what's working and what isn't.
                  </p>
                  <p>
                    <strong className="text-foreground">Your control:</strong> You choose whether to allow analytics when you first visit. You can change your preference anytime in the cookie banner at the bottom of the page.
                  </p>
                </div>

                <div className="rounded-xl bg-muted/30 border border-border p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground block mb-3">Consent by default:</strong>
                    By GDPR standards, we ask for your permission before tracking. Analytics storage is denied by default until you accept.
                  </p>
                </div>
              </section>

              {/* ─ Cookies ─ */}
              <section id="cookies" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Cookies & Consent
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    Cookies are small files stored on your device. We use them to remember your preferences and track site usage for analytics.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Essential Cookies</h4>
                      <p>
                        These are required for the site to function (like your session). We use them without asking.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Analytics Cookies</h4>
                      <p>
                        These track your behavior with Google Analytics. You opt in via the cookie banner.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Your Cookie Preference</h4>
                      <p>
                        We save your choice in <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">localStorage</code> under <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">cookie_consent</code>. Delete this to see the banner again.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ─ Your Rights ─ */}
              <section id="rights" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Your Rights
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    You have rights over your data. Here's what you can do anytime:
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Access Your Data",
                      desc: "Ask us what information we have about you.",
                    },
                    {
                      title: "Delete Your Data",
                      desc: "Request that we remove your information from our systems.",
                    },
                    {
                      title: "Correct Your Data",
                      desc: "Update or fix any information that's inaccurate.",
                    },
                    {
                      title: "Opt Out of Analytics",
                      desc: "Decline all tracking cookies at any time via the cookie banner.",
                    },
                    {
                      title: "Unsubscribe",
                      desc: "Every newsletter email includes an unsubscribe link. One click, and you're out.",
                    },
                  ].map((right, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-card p-6 hover:border-primary/25 transition-all duration-300">
                      <h4 className="font-bold text-foreground mb-2">{right.title}</h4>
                      <p className="text-muted-foreground text-sm">{right.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─ GDPR & Privacy Laws ─ */}
              <section id="gdpr" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  GDPR & Other Privacy Laws
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    If you're in the EU or any jurisdiction with strong privacy laws (GDPR, CCPA, etc.), those protections apply to you.
                  </p>

                  <div className="rounded-xl bg-muted/30 border border-border p-6 md:p-8 space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Legal Basis for Processing</h4>
                      <p className="text-sm">
                        We process your data based on your consent (when you submit a form) or legitimate interest (analytics to improve our site). We never sell or share your data with third parties.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-bold text-foreground mb-2">Data Retention</h4>
                      <p className="text-sm">
                        We keep contact form data for 90 days after our last conversation. Analytics data is kept for 14 months. After that, it's deleted.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-bold text-foreground mb-2">International Transfers</h4>
                      <p className="text-sm">
                        Your data may be processed outside your country. We use standard contractual clauses to ensure protection.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ─ Contact ─ */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Questions About Your Privacy?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Get in touch. We'll respond within 24 hours.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <a
                    href="mailto:privacy@afrisinc.com"
                    className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/25 hover:bg-primary/[0.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(22_88%_52%/0.08)] group-hover:bg-primary/10 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          privacy@afrisinc.com
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://afrisinc.com/contact"
                    className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/25 hover:bg-primary/[0.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(22_88%_52%/0.08)] group-hover:bg-primary/10 transition-colors">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Contact Form</h4>
                        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          Start a conversation
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </section>

              {/* ─ Updates ─ */}
              <section className="mt-20 pt-20 border-t border-border">
                <div className="rounded-xl bg-muted/30 border border-border p-6 md:p-8">
                  <h3 className="font-bold text-foreground mb-3">Policy Updates</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We may update this policy as our practices change or laws evolve. If we make material changes, we'll notify you by email or prominent notice on the site. Your continued use of the site after changes means you accept the new policy.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Privacy;
