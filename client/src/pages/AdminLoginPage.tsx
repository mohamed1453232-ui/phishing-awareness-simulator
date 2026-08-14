import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

// const API_URL = "http://localhost:3000/api";
const API_URL = "https://back-production-e7eb.up.railway.app/api";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || (isArabic ? "فشل تسجيل الدخول" : "Login failed"),
        );
      }

      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isArabic
            ? "فشل تسجيل الدخول"
            : "Login failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative flex min-h-screen items-center justify-center bg-slate-950 bg-cover bg-center bg-no-repeat px-4 text-white"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* Language Switcher */}
      <div className={`absolute top-5 z-20 ${isArabic ? "left-5" : "right-5"}`}>
        <Button
          onClick={() => setLanguage(isArabic ? "en" : "ar")}
          className="border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-black/50"
        >
          <Languages className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`} />

          {isArabic ? "English" : "العربية"}
        </Button>
      </div>

      {/* Admin Login Card */}
      <Card className="relative z-10 w-full max-w-md border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            {isArabic ? "تسجيل دخول المسؤول" : "Admin Login"}
          </CardTitle>

          <CardDescription className="text-slate-400">
            {isArabic
              ? "الوصول إلى لوحة تحليلات الأمان"
              : "Access the security analytics dashboard"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <Label className="text-white">
                {isArabic ? "اسم المستخدم" : "Username"}
              </Label>

              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                placeholder={isArabic ? "اسم المسؤول" : "Admin username"}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-white">
                {isArabic ? "كلمة المرور" : "Password"}
              </Label>

              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                placeholder={isArabic ? "كلمة مرور المسؤول" : "Admin password"}
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full hover:bg-gray-700">
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
                "تسجيل الدخول كمسؤول"
              ) : (
                "Sign In as Admin"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default AdminLoginPage;
