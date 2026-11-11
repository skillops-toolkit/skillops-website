import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bricolage",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillops-website.vercel.app"),
  title: {
    default: "SkillOps · Open-Source AI Skills & Subagents Package Manager",
    template: "%s · SkillOps"
  },
  description:
    "Browse a curated open-source library of AI Skills and Subagents and import them directly into your coding agent with a single npx command.",
  keywords: [
    "SkillOps",
    "skillops-cli",
    "skillops-toolkit",
    "AI coding skills",
    "AI subagents",
    "coding agent skills",
    "Cursor rules",
    "Claude Code skills",
    "GitHub Copilot instructions",
    "Antigravity skills",
    "Windsurf rules",
    "MCP",
    "open source CLI"
  ],
  authors: [{ name: "OdevMatheus", url: "https://github.com/OdevMatheus" }],
  icons: {
    icon: "/brand/skillops-logo.png",
    shortcut: "/brand/skillops-logo.png",
    apple: "/brand/skillops-logo.png"
  },
  openGraph: {
    title: "SkillOps · One skills library. Every coding agent.",
    description:
      "Browse a curated open-source library of AI Skills and Subagents and import them directly into your coding agent with one command.",
    url: "https://skillops-website.vercel.app",
    siteName: "SkillOps",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/skillops-logo-lockup.png",
        width: 1600,
        height: 600,
        alt: "SkillOps · Open-Source AI Skills & Subagents Package Manager"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillOps · One skills library. Every coding agent.",
    description:
      "Browse and import curated AI Skills and Subagents directly into your coding agent with npx skillops-cli@latest.",
    images: ["/brand/skillops-logo-lockup.png"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
