import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "API Project - API RESTful de Gerenciamento de Usuarios",
    template: "%s | API Project",
  },
  description:
    "API moderna e segura para gerenciar usuarios. JWT com refresh token rotation, verificacao de email, rate limiting e audit logs. Swagger UI incluso.",
  keywords: [
    "API",
    "REST",
    "autenticacao",
    "JWT",
    "usuarios",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "API Project" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://api-project-website.vercel.app",
    siteName: "API Project",
    title: "API Project - API RESTful de Gerenciamento de Usuarios",
    description:
      "API moderna e segura para gerenciar usuarios. JWT com refresh token rotation, verificacao de email, rate limiting e audit logs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Project - API RESTful de Gerenciamento de Usuarios",
    description:
      "API moderna e segura para gerenciar usuarios. JWT com refresh token rotation, verificacao de email, rate limiting e audit logs.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
