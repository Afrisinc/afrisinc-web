import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/services/notifyService";
import { useTrackForm } from "@/hooks/useTrackForm";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, Linkedin, Twitter, Youtube, Github } from "lucide-react";

const contactMeta = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@afrisinc.com",
    href: "mailto:hello@afrisinc.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+250786077754",
    href: "tel:+250786077754",
  },
  {
    icon: Mail,
    label: "Email",
    value: "vladmirbrenn@afrisinc.com",
    href: "mailto:vladmirbrenn@afrisinc.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Kigali, Rwanda",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const offices = [
  { city: "Kigali", country: "Rwanda", type: "Headquarters" },
  { city: "Nairobi", country: "Kenya", type: "Regional Office" },
  { city: "Johannesburg", country: "South Africa", type: "Regional Office" },
  { city: "London", country: "United Kingdom", type: "International Office" },
];

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

const quickLinks = [
  { name: "Schedule a Demo", href: "#" },
  { name: "Support Documentation", href: "#" },
  { name: "Partner Program", href: "#" },
  { name: "Investor Relations", href: "#" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const { onStart, onSubmit: trackSubmit, onError } = useTrackForm("contact_form", "Contact Us");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onStart(); // Track form submission start
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
      });
      trackSubmit(); // Track successful submission
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    } catch (err) {
      onError("message", "server"); // Track error
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-background dot-grid grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

        <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
          <div className="max-w-4xl">
            <p className="line-accent mb-12 animate-fade-in">Get In Touch</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Let's Start a
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Conversation.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              A question, a half-formed idea, or a proper proposal — send it over. We respond to every message
              within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info ───────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Contact</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                We Read <span className="font-display italic text-gradient-primary">Every Message.</span>
              </h2>
            </div>
          </div>

          {/* Two-column: info left, form right */}
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
            {/* ── Left panel ── */}
            <div className="space-y-10">
              {/* Contact meta */}
              <div className="space-y-5">
                {contactMeta.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "hsl(var(--terra) / 0.08)",
                        border: "1px solid hsl(var(--terra) / 0.18)",
                      }}
                    >
                      <info.icon className="w-4 h-4" style={{ color: "hsl(var(--terra))" }} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55 mb-0.5">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium text-sm hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-foreground font-medium text-sm">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Kente strip */}
              <div className="kente-border rounded-full overflow-hidden opacity-65" />

              {/* Social pills */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
                  Follow
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Offices */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55 mb-4">
                  Our Offices
                </p>
                <div className="divide-y divide-border">
                  {offices.map((office) => (
                    <div key={office.city} className="flex items-center justify-between py-3">
                      <div>
                        <span className="text-sm font-semibold text-foreground">{office.city}</span>
                        <span className="text-sm text-muted-foreground ml-2">{office.country}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/55 text-right">
                        {office.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links — dark card */}
              <div className="rounded-2xl bg-foreground text-background grain relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 kente-border opacity-55" />
                <div className="p-8 relative z-10">
                  <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/40 before:block before:w-6 before:h-px before:bg-background/40 before:flex-shrink-0">
                    Quick Links
                  </p>
                  <ul className="mt-6 space-y-3">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-background/65 hover:text-background transition-colors duration-200"
                        >
                          {link.name}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Right panel: Form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 bg-muted/30 border-border/60 focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 bg-muted/30 border-border/60 focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    Company
                  </label>
                  <Input
                    name="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                    className="h-12 bg-muted/30 border-border/60 focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    placeholder="What's on your mind?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 bg-muted/30 border-border/60 focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                  Message *
                </label>
                <Textarea
                  name="message"
                  placeholder="Give us the details — or just say hi. We'll figure it out from there."
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-muted/30 border-border/60 focus:border-primary/40 resize-none transition-colors"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting}
                className="w-full group shadow-primary"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send It
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
