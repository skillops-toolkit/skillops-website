import type { NextConfig } from "next";

function buildContentSecurityPolicy(options?: { allowBrandCdn?: boolean }): string {
  const isDev = process.env.NODE_ENV === "development";
  const scriptSources = ["'self'", "'unsafe-inline'"];
  if (isDev) {
    scriptSources.push("'unsafe-eval'");
  }
  if (options?.allowBrandCdn) {
    scriptSources.push("https://cdn.jsdelivr.net");
  }

  const connectSources = isDev ? ["'self'", "ws:", "wss:"] : ["'self'"];

  return [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com data:",
    `connect-src ${connectSources.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join("; ");
}

const commonSecurityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  }
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...commonSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy()
          }
        ]
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy({ allowBrandCdn: true })
          }
        ]
      }
    ];
  }
};

export default nextConfig;
