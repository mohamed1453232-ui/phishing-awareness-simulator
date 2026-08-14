import { useEffect, useState } from "react";
import {
  Activity,
  Eye,
  LogIn,
  ShieldCheck,
  Users,
  Languages,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { getAnalyticsStats } from "../services/stats.service";
import type { AnalyticsStats } from "../services/stats.service";

import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

function DashboardPage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAnalyticsStats();

      setStats(data);
    } catch (error) {
      console.error(error);

      setError(
        isArabic
          ? "فشل تحميل إحصائيات لوحة التحكم"
          : "Failed to load dashboard statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/admin");
    }
  };

  // Loading state
  if (loading) {
    return (
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="flex min-h-screen items-center justify-center bg-slate-950 text-white"
      >
        <div className="text-center">
          <Activity className="mx-auto mb-4 h-8 w-8 animate-pulse text-blue-400" />

          <p className="text-slate-400">
            {isArabic
              ? "جاري تحميل تحليلات الأمان..."
              : "Loading security analytics..."}
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white"
      >
        <Card className="w-full max-w-md border-red-500/20 bg-red-500/5 text-white">
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-red-400">
              {error ||
                (isArabic
                  ? "تعذر تحميل الإحصائيات"
                  : "Unable to load statistics")}
            </p>

            <Button onClick={fetchStats}>
              {isArabic ? "حاول مرة أخرى" : "Try Again"}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Calculate non-submission rate
  const nonSubmissionCount = Math.max(
    stats.totalVisits - stats.loginAttempts,
    0
  );

  const nonSubmissionRate =
    stats.totalVisits > 0
      ? (
          (nonSubmissionCount / stats.totalVisits) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 px-4 py-10 text-white"
    >
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-3">

              <ShieldCheck className="h-8 w-8 text-blue-400" />

              <h1 className="text-3xl font-bold">
                {isArabic
                  ? "لوحة تحكم الأمان"
                  : "Security Dashboard"}
              </h1>

            </div>

            <p className="text-slate-400">
              {isArabic
                ? "تحليلات محاكاة التوعية ضد التصيد الاحتيالي"
                : "Phishing awareness simulation analytics"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            {/* Language */}
            <Button
              variant="outline"
              onClick={() =>
                setLanguage(isArabic ? "en" : "ar")
              }
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Languages
                className={`h-4 w-4 ${
                  isArabic ? "ml-2" : "mr-2"
                }`}
              />

              {isArabic ? "English" : "العربية"}
            </Button>

            {/* Refresh */}
            <Button
              onClick={fetchStats}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              {isArabic
                ? "تحديث البيانات"
                : "Refresh Data"}
            </Button>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              className="border-white/10 bg-red-600 text-white hover:bg-red-700"
            >
              {isArabic ? "تسجيل الخروج" : "Log out"}
            </Button>

          </div>
        </header>

        {/* Statistics Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Visits */}
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-sm font-medium text-slate-400">
                {isArabic
                  ? "إجمالي الزيارات"
                  : "Total Visits"}
              </CardTitle>

              <Eye className="h-5 w-5 text-blue-400" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {stats.totalVisits}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {isArabic
                  ? "الزيارات المسجلة للمحاكاة"
                  : "Recorded simulation visits"}
              </p>

            </CardContent>
          </Card>

          {/* Login Attempts */}
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-sm font-medium text-slate-400">
                {isArabic
                  ? "محاولات تسجيل الدخول"
                  : "Login Attempts"}
              </CardTitle>

              <LogIn className="h-5 w-5 text-orange-400" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {stats.loginAttempts}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {isArabic
                  ? "المستخدمون الذين حاولوا تسجيل الدخول"
                  : "Users who attempted to sign in"}
              </p>

            </CardContent>
          </Card>

          {/* Non-Submission Rate */}
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-sm font-medium text-slate-400">
                {isArabic
                  ? "نسبة عدم الإرسال"
                  : "Non-Submission Rate"}
              </CardTitle>

              <Users className="h-5 w-5 text-green-400" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {nonSubmissionRate}%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {isArabic
                  ? "الزوار الذين لم يرسلوا المحاكاة"
                  : "Visitors who did not submit the simulation"}
              </p>

            </CardContent>
          </Card>

        </section>

        {/* Simulation Overview */}
        <Card className="border-blue-500/20 bg-blue-500/5 text-white">

          <CardHeader>
            <CardTitle>
              {isArabic
                ? "نظرة عامة على المحاكاة"
                : "Simulation Overview"}
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="grid gap-6 md:grid-cols-3">

              {/* Visitors */}
              <div>
                <p className="text-sm text-slate-400">
                  {isArabic ? "الزوار" : "Visitors"}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {stats.totalVisits}
                </p>
              </div>

              {/* Login Attempts */}
              <div>
                <p className="text-sm text-slate-400">
                  {isArabic
                    ? "محاولات تسجيل الدخول"
                    : "Login Attempts"}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {stats.loginAttempts}
                </p>
              </div>

              {/* Did Not Submit */}
              <div>
                <p className="text-sm text-slate-400">
                  {isArabic
                    ? "لم يرسل البيانات"
                    : "Did Not Submit"}
                </p>

                <p className="mt-1 text-2xl font-bold text-green-400">
                  {nonSubmissionCount}
                </p>
              </div>

            </div>

          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-green-500/20 bg-green-500/5 text-white">

          <CardContent className="flex gap-4 p-6">

            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-green-400" />

            <div>

              <h2 className="font-semibold">
                {isArabic
                  ? "الخصوصية والأمان"
                  : "Privacy & Safety"}
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                {isArabic
                  ? "لا تقوم هذه المحاكاة بجمع أو إرسال أو تخزين كلمات المرور أو أسماء المستخدمين أو عناوين البريد الإلكتروني أو أي بيانات اعتماد حساسة أخرى. يتم تسجيل أحداث مجهولة المصدر فقط لأغراض تحليل التوعية الأمنية."
                  : "This simulation does not collect, transmit, or store passwords, usernames, email addresses, or other sensitive credentials. Only anonymous simulation events are recorded for awareness analytics."}
              </p>

            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}

export default DashboardPage;