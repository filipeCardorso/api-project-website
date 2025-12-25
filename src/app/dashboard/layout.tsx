import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Painel de controle da API Project. Visualize suas estatisticas, gerencie sua API key e acesse recursos importantes.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
