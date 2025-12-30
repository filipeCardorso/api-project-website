"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Activity,
  Filter,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface AuditLog {
  id: string
  userId: number | null
  user: { name: string; email: string } | null
  action: string
  entity: string
  entityId: string | null
  oldData: string | null
  newData: string | null
  ip: string | null
  userAgent: string | null
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const actionColors: Record<string, string> = {
  login: "bg-green-500/10 text-green-700",
  logout: "bg-gray-500/10 text-gray-700",
  register: "bg-blue-500/10 text-blue-700",
  create: "bg-blue-500/10 text-blue-700",
  update: "bg-yellow-500/10 text-yellow-700",
  delete: "bg-red-500/10 text-red-700",
  data_access_request: "bg-purple-500/10 text-purple-700",
  data_portability_request: "bg-purple-500/10 text-purple-700",
  deletion_request_created: "bg-red-500/10 text-red-700",
  consent_granted: "bg-green-500/10 text-green-700",
  consent_withdrawn: "bg-orange-500/10 text-orange-700",
}

const actionLabels: Record<string, string> = {
  login: "Login",
  logout: "Logout",
  register: "Registro",
  create: "Criacao",
  update: "Atualizacao",
  delete: "Exclusao",
  data_access_request: "Acesso Dados",
  data_portability_request: "Portabilidade",
  data_correction: "Correcao Dados",
  deletion_request_created: "Solicitacao Exclusao",
  deletion_confirmed: "Exclusao Confirmada",
  deletion_cancelled: "Exclusao Cancelada",
  consent_granted: "Consentimento",
  consent_withdrawn: "Revogacao",
  consent_updated: "Atualizacao Consent",
}

export default function AdminAuditLogsPage() {
  const { getToken } = useAuth()
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [filters, setFilters] = useState({
    action: "",
    userId: "",
    startDate: "",
    endDate: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      })
      if (filters.action) params.append("action", filters.action)
      if (filters.userId) params.append("userId", filters.userId)
      if (filters.startDate) params.append("startDate", filters.startDate)
      if (filters.endDate) params.append("endDate", filters.endDate)

      const response = await fetch(`${API_URL}/api/admin/audit-logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar logs")
      }

      const data = await response.json()
      setLogs(data.logs)
      setPagination(data.pagination)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [getToken, filters])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLogs(1)
  }

  const clearFilters = () => {
    setFilters({ action: "", userId: "", startDate: "", endDate: "" })
  }

  const handlePageChange = (newPage: number) => {
    fetchLogs(newPage)
  }

  if (loading && logs.length === 0) {
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
        <Button variant="outline" size="sm" onClick={() => fetchLogs()} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Logs de Auditoria
          </h2>
          <p className="text-muted-foreground text-sm">
            {pagination.total} registros encontrados
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Acao</label>
                <select
                  value={filters.action}
                  onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Todas</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                  <option value="register">Registro</option>
                  <option value="create">Criacao</option>
                  <option value="update">Atualizacao</option>
                  <option value="delete">Exclusao</option>
                  <option value="data_access_request">Acesso Dados</option>
                  <option value="data_portability_request">Portabilidade</option>
                  <option value="consent_granted">Consentimento</option>
                  <option value="consent_withdrawn">Revogacao</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">User ID</label>
                <input
                  type="text"
                  value={filters.userId}
                  onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                  placeholder="ID do usuario"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Data Inicio</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Data Fim</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="md:col-span-4 flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aplicar Filtros"}
                </Button>
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${actionColors[log.action] || "bg-gray-500/10"}`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">
                          {actionLabels[log.action] || log.action}
                        </Badge>
                        <Badge variant="secondary">{log.entity}</Badge>
                        {log.entityId && (
                          <span className="text-xs text-muted-foreground">
                            ID: {log.entityId}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.user?.name || "Sistema"}
                          {log.user?.email && (
                            <span className="text-xs">({log.user.email})</span>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(log.createdAt).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      {log.ip && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          IP: {log.ip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {(log.oldData || log.newData) && (
                  <div className="mt-3 pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                    {log.oldData && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Dados Anteriores:</p>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {JSON.stringify(JSON.parse(log.oldData), null, 2)}
                        </pre>
                      </div>
                    )}
                    {log.newData && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Dados Novos:</p>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {JSON.stringify(JSON.parse(log.newData), null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {logs.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Nenhum log encontrado
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Pagina {pagination.page} de {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* LGPD Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Art. 37 - Registro de Operacoes</h3>
              <p className="text-sm text-muted-foreground mt-1">
                O controlador e o operador devem manter registro das operacoes de tratamento
                de dados pessoais que realizarem, especialmente quando baseado no legitimo interesse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
