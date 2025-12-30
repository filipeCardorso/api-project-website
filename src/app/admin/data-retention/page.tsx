"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Loader2,
  AlertTriangle,
  Play,
  Clock,
  Trash2,
  Key,
  FileText,
  Users,
  CheckCircle,
  RefreshCw,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface RetentionStats {
  expiredTokens: number
  oldAuditLogs: number
  oldConsentRecords: number
  softDeletedUsers: number
  pendingDeletions: number
  totalUsers: number
}

interface RetentionPolicy {
  id: string
  name: string
  description: string
  retentionPeriod: string
  icon: React.ReactNode
  count: number
  color: string
}

interface ExecutionReport {
  executedAt: string
  policies: {
    name: string
    processed: number
    errors: number
  }[]
  totalProcessed: number
  errors: number
}

export default function AdminDataRetentionPage() {
  const { getToken } = useAuth()
  const [stats, setStats] = useState<RetentionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [executing, setExecuting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastReport, setLastReport] = useState<ExecutionReport | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/data-retention`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar estatísticas")
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const executeRetention = async () => {
    if (!confirm("Confirma a execucao das politicas de retencao? Esta acao ira limpar dados expirados.")) {
      return
    }

    setExecuting(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/data-retention`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Erro ao executar políticas")
      }

      const data = await response.json()
      setLastReport(data.report)

      // Refresh stats
      fetchStats()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setExecuting(false)
    }
  }

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

  const policies: RetentionPolicy[] = [
    {
      id: "expired_tokens",
      name: "Tokens Expirados",
      description: "Refresh tokens com mais de 7 dias",
      retentionPeriod: "7 dias",
      icon: <Key className="w-5 h-5" />,
      count: stats?.expiredTokens || 0,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      id: "audit_logs",
      name: "Logs de Auditoria",
      description: "Logs com mais de 365 dias (arquivamento)",
      retentionPeriod: "365 dias",
      icon: <FileText className="w-5 h-5" />,
      count: stats?.oldAuditLogs || 0,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      id: "consent_records",
      name: "Registros de Consentimento",
      description: "Consentimentos com mais de 3 anos",
      retentionPeriod: "3 anos",
      icon: <CheckCircle className="w-5 h-5" />,
      count: stats?.oldConsentRecords || 0,
      color: "text-green-500 bg-green-500/10",
    },
    {
      id: "soft_deleted",
      name: "Usuarios Excluidos",
      description: "Contas soft-deleted com mais de 30 dias",
      retentionPeriod: "30 dias",
      icon: <Users className="w-5 h-5" />,
      count: stats?.softDeletedUsers || 0,
      color: "text-red-500 bg-red-500/10",
    },
    {
      id: "pending_deletions",
      name: "Exclusoes Pendentes",
      description: "Solicitacoes de exclusao aguardando periodo de carencia",
      retentionPeriod: "30 dias",
      icon: <Trash2 className="w-5 h-5" />,
      count: stats?.pendingDeletions || 0,
      color: "text-orange-500 bg-orange-500/10",
    },
  ]

  const totalPending = policies.reduce((acc, p) => acc + p.count, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="w-5 h-5" />
            Retencao de Dados
          </h2>
          <p className="text-muted-foreground text-sm">
            Gerenciamento de politicas de retencao LGPD
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={executeRetention} disabled={executing || totalPending === 0}>
            {executing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Executando...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Executar Politicas
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Resumo</h3>
              <p className="text-sm text-muted-foreground">
                {stats?.totalUsers || 0} usuarios ativos no sistema
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalPending}</p>
              <p className="text-sm text-muted-foreground">itens para processar</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Execution Report */}
      {lastReport && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Ultima Execucao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Executado em: {new Date(lastReport.executedAt).toLocaleString("pt-BR")}
              </span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {lastReport.totalProcessed} processados
              </Badge>
            </div>
            <div className="space-y-2">
              {lastReport.policies.map((policy) => (
                <div key={policy.name} className="flex items-center justify-between text-sm">
                  <span>{policy.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{policy.processed} processados</Badge>
                    {policy.errors > 0 && (
                      <Badge variant="destructive">{policy.errors} erros</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <Card key={policy.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${policy.color}`}>
                  {policy.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{policy.name}</h3>
                    <Badge variant={policy.count > 0 ? "default" : "secondary"}>
                      {policy.count}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Retencao: {policy.retentionPeriod}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Retention Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cronograma de Retencao</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo de Dado</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Periodo</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Acao</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Base Legal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Tokens de Sessao</td>
                  <td className="py-3 px-4">7 dias</td>
                  <td className="py-3 px-4">Exclusao permanente</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 16, I - Finalidade alcancada</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">IPs em Audit Logs</td>
                  <td className="py-3 px-4">30 dias</td>
                  <td className="py-3 px-4">Anonimizacao</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 16, II - Minimizacao</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Logs de Auditoria</td>
                  <td className="py-3 px-4">365 dias</td>
                  <td className="py-3 px-4">Arquivamento</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 37 - Registro de operacoes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Registros de Consentimento</td>
                  <td className="py-3 px-4">3 anos</td>
                  <td className="py-3 px-4">Exclusao permanente</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 8, §5 - Prova de consentimento</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Contas Soft Deleted</td>
                  <td className="py-3 px-4">30 dias</td>
                  <td className="py-3 px-4">Hard delete</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 18, VI - Direito a eliminacao</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Contas Inativas</td>
                  <td className="py-3 px-4">24 meses</td>
                  <td className="py-3 px-4">Notificacao + Exclusao</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Art. 16 - Termino do tratamento</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* LGPD Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Database className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">Art. 16 - Termino do Tratamento</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Os dados pessoais serao eliminados apos o termino de seu tratamento,
                no ambito e nos limites tecnicos das atividades, autorizada a
                conservacao para cumprimento de obrigacao legal, estudo por orgao de pesquisa,
                transferencia a terceiro ou uso exclusivo do controlador desde que anonimizados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
