import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getRuntimeConfig } from "@/lib/config";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get("code");

      if (!code) {
        toast({
          title: "Authorization Failed",
          description: "No authorization code provided.",
          variant: "destructive",
        });
        // navigate("/login");
        return;
      }

      try {
        const config = getRuntimeConfig();
        const response = await fetch(`${config.serverUrl}/oauth/exchange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast({
            title: "Authorization Failed",
            description: errorData.resp_msg || "Failed to exchange code for token.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (data.success && data.resp_code === 1000) {
          const token = data.data.token || "";
          const expiresIn = data.data.expires_in;

          localStorage.setItem("token", token);
          localStorage.setItem("token_type", data.data.token_type || "Bearer");
          if (expiresIn) {
            localStorage.setItem("token_expires_at", String(Date.now() + expiresIn * 1000));
          }
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data.data.user_id,
              email: data.data.email,
              accountIds: data.data.account_ids || [],
            })
          );

          toast({
            title: "Welcome!",
            description: "You've successfully signed in.",
          });

          // Redirect to dashboard with full page reload to update AuthContext
          window.location.href = "/dashboard";
        } else {
          toast({
            title: "Authorization Failed",
            description: data.resp_msg || "Failed to exchange code for token.",
            variant: "destructive",
          });
          navigate("/login");
        }
      } catch (error) {
        toast({
          title: "Authorization Failed",
          description:
            error instanceof Error
              ? error.message
              : "An error occurred during authorization.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto animate-spin">
            <div className="w-10 h-10 rounded-lg bg-background"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Completing sign in...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we authenticate your account.
        </p>
      </div>
    </div>
  );
};

export default Callback;
