import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";

import { Button } from "../components/ui/button";
import { trackLoginAttempt, trackVisit } from "../services/analytics.service";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  useEffect(() => {
    trackVisit().catch((error) => {
      console.error("Failed to track visit:", error);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await trackLoginAttempt();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmail("");
      setPassword("");

      navigate("/awareness");
    } catch (error) {
      console.error("Failed to track login attempt:", error);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/awareness");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/50" />

      {/* Language Switcher */}
      <div className="absolute right-5 top-5 z-20">
        <Button
          onClick={() => setLanguage(isArabic ? "en" : "ar")}
          className="border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-black/50"
        >
          <Languages className={`${isArabic ? "ml-2" : "mr-2"} h-4 w-4`} />

          {isArabic ? "English" : "العربية"}
        </Button>
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-2 py-5 text-center">
          <CardTitle className="text-2xl font-bold">Secure Guard</CardTitle>

          <CardDescription>
            {isArabic
              ? "سجّل الدخول للمتابعة إلى حسابك"
              : "Sign in to continue to your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {isArabic ? "البريد الإلكتروني" : "Email"}
              </Label>

              <Input
                id="email"
                type="email"
                placeholder={isArabic ? "name@example.com" : "name@example.com"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                {isArabic ? "كلمة المرور" : "Password"}
              </Label>

              <Input
                id="password"
                type="password"
                placeholder={
                  isArabic ? "أدخل كلمة المرور" : "Enter your password"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className={`h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent ${
                      isArabic ? "ml-2" : "mr-2"
                    }`}
                  />

                  {isArabic ? "جاري تسجيل الدخول..." : "Signing in..."}
                </>
              ) : isArabic ? (
                "تسجيل الدخول"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginPage;
