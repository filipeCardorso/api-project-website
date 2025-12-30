"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Shield,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Loader2,
  RefreshCw,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface DashboardStats {
  users: {
    total: number
    active: number
    deleted: number
  }
  auditLogs: {
    total: number
    today: number
  }
  incidents: {
    total: number
    pending: number
    critical: number
  }
  retention: {
    expiredTokens: number
    pendingDeletions: number
  }
}

export default function AdminDashboardPage() {
  const { getToken } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      // Fetch multiple endpoints in parallel
      const [retentionRes, incidentsRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/admin/data-retention`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/admin/security-incidents?limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      // Parse retention stats
      let retentionData = null
      if (retentionRes.status === "fulfilled" && retentionRes.value.ok) {
        retentionData = await retentionRes.value.json()
      }

      // Parse incidents
      let incidentsData = null
      if (incidentsRes.status === "fulfilled" && incidentsRes.value.ok) {
        incidentsData = await incidentsRes.value.json()
      }

      // Build stats object
      const dashboardStats: DashboardStats = {
        users: {
          total: retentionData?.stats?.totalUsers || 0,
          active: retentionData?.stats?.totalUsers || 0,
          deleted: retentionData?.stats?.softDeletedUsers || 0,
        },
        auditLogs: {
          total: retentionData?.stats?.oldAuditLogs || 0,
          today: 0,
        },
        incidents: {
          total: incidentsData?.pagination?.total || 0,
          pending: incidentsData?.incidents?.filter((i: { notifiedAnpd: boolean }) => !i.notifiedAnpd).length || 0,
          critical: incidentsData?.incidents?.filter((i: { riskLevel: string }) => i.riskLevel === "critical").length || 0,
        },
        retention: {
          expiredTokens: retentionData?.stats?.expiredTokens || 0,
          pendingDeletions: retentionData?.stats?.pendingDeletions || 0,
        },
      }

      setStats(dashboardStats)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <p className="text-destructive font-medium">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchStats} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    )
  }

  const statCards = [
    {
      title: "Usuarios Ativos",
      value: stats?.users.active || 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: `${stats?.users.deleted || 0} excluidos`,
      href: "/admin/users",
    },
    {
      title: "Audit Logs",
      value: stats?.auditLogs.total || 0,
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Registros antigos",
      href: "/admin/audit-logs",
    },
    {
      title: "Incidentes",
      value: stats?.incidents.total || 0,
      icon: Shield,
      color: stats?.incidents.critical ? "text-red-500" : "text-orange-500",
      bgColor: stats?.incidents.critical ? "bg-red-500/10" : "bg-orange-500/10",
      description: `${stats?.incidents.pending || 0} pendentes ANPD`,
      href: "/admin/security-incidents",
    },
    {
      title: "Retencao",
      value: stats?.retention.expiredTokens || 0,
      icon: Database,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Tokens expirados",
      href: "/admin/data-retention",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Visao Geral</h2>
          <p className="text-muted-foreground text-sm">
            Metricas e status do sistema
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Acoes Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.incidents.pending ? (
              <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-sm">Incidentes nao notificados</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.incidents.pending} aguardando notificacao ANPD
                    </p>
                  </div>
                </div>
                <Link href="/admin/security-incidents">
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </Link>
              </div>
            ) : null}

            {stats?.retention.pendingDeletions ? (
              <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-sm">Exclusoes agendadas</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.retention.pendingDeletions} contas para excluir
                    </p>
                  </div>
                </div>
                <Link href="/admin/data-retention">
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </Link>
              </div>
            ) : null}

            {!stats?.incidents.pending && !stats?.retention.pendingDeletions && (
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  Nenhuma acao pendente
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Acoes Rapidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Gerenciar usuarios</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>

            <Link
              href="/admin/audit-logs"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Ver logs de auditoria</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>

            <Link
              href="/admin/security-incidents"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Registrar incidente</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>

            <Link
              href="/admin/data-retention"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Executar politicas de retencao</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* LGPD Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status de Compliance LGPD</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Endpoints Ativos</p>
              <p className="text-xs text-muted-foreground">Art. 18 - Direitos</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Consentimentos</p>
              <p className="text-xs text-muted-foreground">Art. 8 - Registro</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Audit Logs</p>
              <p className="text-xs text-muted-foreground">Art. 37 - Registro</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Breach Notification</p>
              <p className="text-xs text-muted-foreground">Art. 48 - Incidentes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
