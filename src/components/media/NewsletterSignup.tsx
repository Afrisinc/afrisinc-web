import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTrackForm } from "@/hooks/useTrackForm";
import { subscribeNewsletter } from "@/services/notifyService";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  /** Analytics + backend attribution, e.g. "media_page". */
  formPage: string;
  categories?: string[];
  eyebrow?: string;
  title?: string;
  accent?: string;
  description?: string;
  className?: string;
}

type Status = "idle" | "submitting" | "success";

/** Dark newsletter band with inline success state. */
export function NewsletterSignup({
  formPage,
  categories = [],
  eyebrow = "Newsletter",
  title = "Get the latest",
  accent = "insights.",
  description = "A considered briefing on Africa's technology ecosystem, delivered to your inbox. No spam, unsubscribe anytime.",
  className,
}: NewsletterSignupProps) {
  const { toast } = useToast();
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { onStart, onSubmit, onError } = useTrackForm("newsletter_form", "Newsletter Signup");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onStart();
    setStatus("submitting");
    try {
      await subscribeNewsletter(email.trim(), { categories, formPage });
      onSubmit();
      setStatus("success");
      setEmail("");
    } catch {
      onError("email", "server");
      setStatus("idle");
      toast({
        title: "We couldn't subscribe you",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      aria-labelledby={`${inputId}-heading`}
      className={cn("relative overflow-hidden bg-foreground text-background grain py-28 md:py-36", className)}
    >
      <div className="absolute top-0 inset-x-0 kente-border opacity-55" aria-hidden />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/50 before:block before:w-6 before:h-px before:bg-primary before:flex-shrink-0 self-start">
            {eyebrow}
          </p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-end">
            <div>
              <h2
                id={`${inputId}-heading`}
                className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.0] text-background"
              >
                {title} <span className="font-display italic text-gradient-primary">{accent}</span>
              </h2>
              <p className="mt-5 text-background/60 leading-relaxed max-w-md">{description}</p>
            </div>

            <div aria-live="polite">
              {status === "success" ? (
                <div className="flex items-start gap-3 rounded-xl border border-background/15 bg-background/5 p-5">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-semibold text-background">You're on the list.</p>
                    <p className="text-sm text-background/60 mt-1">
                      Look out for our next edition in your inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Subscribe another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id={inputId}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "submitting"}
                      className="h-12 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus-visible:border-background/40 focus-visible:ring-offset-foreground"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="group h-12 shadow-primary flex-shrink-0"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                          Subscribing
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight
                            aria-hidden
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-background/45">
                    By subscribing you agree to our{" "}
                    <Link to="/privacy" className="underline underline-offset-2 hover:text-background/80">
                      privacy policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
