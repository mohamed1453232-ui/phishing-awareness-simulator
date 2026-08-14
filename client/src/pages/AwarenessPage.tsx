import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Languages,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { useNavigate } from "react-router-dom";

function AwarenessPage() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 px-4 py-10 text-white"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Language Switcher */}
        <div className="flex justify-end">
          <Button
            onClick={() => setLanguage(isArabic ? "en" : "ar")}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Languages className="mr-2 h-4 w-4" />

            {isArabic ? "English" : "العربية"}
          </Button>
        </div>

        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-9 w-9 text-red-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isArabic
              ? "لقد تفاعلت مع صفحة تصيد احتيالي تجريبية"
              : "You Just Encountered a Phishing Simulation"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            {isArabic
              ? "لا تقلق — كانت هذه محاكاة آمنة للتوعية الأمنية. لم يتم جمع أو تخزين أي بيانات تسجيل دخول."
              : "Don't worry — this was a safe security-awareness simulation. No credentials were collected or stored."}
          </p>
        </section>

        {/* What Happened */}
        <Card className="border-white/10 bg-white/5 text-white backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-blue-400" />

              {isArabic ? "ماذا حدث؟" : "What Happened?"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-slate-300">
            <p>
              {isArabic
                ? "صفحة تسجيل الدخول التي تفاعلت معها تم تصميمها لمحاكاة هجوم تصيد احتيالي."
                : "The login page you interacted with was designed to simulate a phishing attack."}
            </p>

            <p>
              {isArabic
                ? "في هجمات التصيد الحقيقية، قد يقوم المهاجمون بإنشاء صفحات تسجيل دخول مزيفة لخداع المستخدمين وإجبارهم على الكشف عن معلومات حساسة."
                : "In a real phishing attack, attackers may create fake login pages to trick users into revealing sensitive information."}
            </p>

            <p className="font-medium text-green-400">
              {isArabic
                ? "في هذه المحاكاة، لم يتم إرسال بيانات تسجيل الدخول إلى الخادم ولم يتم تخزينها."
                : "In this simulation, your credentials were never sent to the server and were not stored."}
            </p>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              {isArabic
                ? "علامات تحذيرية يجب الانتباه إليها"
                : "Warning Signs You Should Look For"}
            </h2>

            <p className="mt-2 text-slate-400">
              {isArabic
                ? "هذه بعض العلامات الشائعة التي قد تشير إلى أن صفحة تسجيل الدخول أو الرسالة قد تكون ضارة."
                : "These are common indicators that a login page or message may be malicious."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Suspicious URLs */}
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg">
                  🔗 {isArabic ? "روابط وعناوين URL مشبوهة" : "Suspicious URLs"}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-slate-400">
                {isArabic
                  ? "تحقق دائمًا من عنوان الموقع قبل إدخال أي معلومات حساسة. انتبه إلى أسماء النطاقات الغريبة أو الأخطاء الإملائية أو تركيب الرابط غير المعتاد."
                  : "Always inspect the website address before entering sensitive information. Look for unusual domains, misspellings, or unexpected URL structures."}
              </CardContent>
            </Card>

            {/* Urgency */}
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg">
                  ⚡ {isArabic ? "الاستعجال والضغط" : "Urgency & Pressure"}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-slate-400">
                {isArabic
                  ? "غالبًا ما يحاول المهاجمون خلق شعور بالاستعجال، مثل الادعاء بأن حسابك سيتم إغلاقه أو تعليقه."
                  : "Attackers often create a sense of urgency, such as claiming that your account will be locked or suspended."}
              </CardContent>
            </Card>

            {/* Unexpected Login */}
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg">
                  🔐{" "}
                  {isArabic
                    ? "طلبات تسجيل الدخول غير المتوقعة"
                    : "Unexpected Login Requests"}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-slate-400">
                {isArabic
                  ? "كن حذرًا عندما تطلب منك رسالة تسجيل الدخول بشكل غير متوقع، خاصة إذا لم تكن تتوقع هذه الرسالة."
                  : "Be careful when a message unexpectedly asks you to sign in, especially when you were not expecting it."}
              </CardContent>
            </Card>

            {/* Spelling */}
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg">
                  ✍️{" "}
                  {isArabic
                    ? "الأخطاء الإملائية والتصميم"
                    : "Spelling & Design Issues"}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-slate-400">
                {isArabic
                  ? "الأخطاء اللغوية، الكلمات الغريبة، اختلاف الهوية البصرية أو التصميم غير المعتاد قد تكون علامات تحذيرية."
                  : "Poor grammar, strange wording, inconsistent branding, or unusual layouts can be warning signs."}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Protection */}
        <Card className="border-green-500/20 bg-green-500/5 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-green-400" />

              {isArabic ? "كيف تحمي نفسك؟" : "How to Protect Yourself"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {(isArabic
                ? [
                    "تحقق من عنوان الموقع قبل تسجيل الدخول.",
                    "لا تستخدم نفس كلمة المرور في الحسابات المهمة.",
                    "فعّل المصادقة متعددة العوامل (MFA) كلما أمكن.",
                    "تجنب الضغط على روابط تسجيل الدخول غير المتوقعة.",
                    "عند الشك، افتح الموقع الرسمي بنفسك بدلًا من الضغط على الرابط.",
                    "أبلغ عن الرسائل المشبوهة إلى الجهة المختصة.",
                  ]
                : [
                    "Check the URL before signing in.",
                    "Never reuse passwords across important accounts.",
                    "Enable multi-factor authentication whenever possible.",
                    "Avoid clicking unexpected login links.",
                    "When in doubt, open the official website manually.",
                    "Report suspicious messages to your organization.",
                  ]
              ).map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />

                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* logout Button */}

        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-blue-600 px-8 hover:bg-blue-700"
          >
            {isArabic ? "تسجيل الخروج" : "Log out"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AwarenessPage;
