"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  Users,
  Calendar,
  X,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface SecurityIncident {
  id: string
  discoveredAt: string
  occurredAt: string | null
  description: string
  affectedDataCategories: string[]
  affectedUserCount: number
  riskLevel: "low" | "medium" | "high" | "critical"
  mitigationActions: string | null
  notifiedAnpd: boolean
  notifiedAnpdAt: string | null
  notifiedUsers: boolean
  notifiedUsersAt: string | null
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const riskColors: Record<string, string> = {
  low: "bg-blue-500/10 text-blue-700 border-blue-500",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500",
  high: "bg-orange-500/10 text-orange-700 border-orange-500",
  critical: "bg-red-500/10 text-red-700 border-red-500",
}

const riskLabels: Record<string, string> = {
  low: "Baixo",
  medium: "Medio",
  high: "Alto",
  critical: "Critico",
}

const dataCategories = [
  { id: "personal_data", label: "Dados Pessoais" },
  { id: "sensitive_data", label: "Dados Sensiveis" },
  { id: "financial_data", label: "Dados Financeiros" },
  { id: "health_data", label: "Dados de Saude" },
  { id: "biometric_data", label: "Dados Biometricos" },
  { id: "location_data", label: "Dados de Localizacao" },
  { id: "credentials", label: "Credenciais" },
]

export default function AdminSecurityIncidentsPage() {
  const { getToken } = useAuth()
  const [incidents, setIncidents] = useState<SecurityIncident[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    description: "",
    discoveredAt: new Date().toISOString().split("T")[0],
    occurredAt: "",
    affectedDataCategories: [] as string[],
    affectedUserCount: 0,
    riskLevel: "medium" as "low" | "medium" | "high" | "critical",
    mitigationActions: "",
  })

  const fetchIncidents = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      })

      const response = await fetch(`${API_URL}/api/admin/security-incidents?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar incidentes")
      }

      const data = await response.json()
      setIncidents(data.incidents)
      setPagination(data.pagination)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    fetchIncidents()
  }, [fetchIncidents])

  const handlePageChange = (newPage: number) => {
    fetchIncidents(newPage)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      affectedDataCategories: prev.affectedDataCategories.includes(categoryId)
        ? prev.affectedDataCategories.filter((c) => c !== categoryId)
        : [...prev.affectedDataCategories, categoryId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading("submit")

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/security-incidents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          discoveredAt: new Date(formData.discoveredAt).toISOString(),
          occurredAt: formData.occurredAt
            ? new Date(formData.occurredAt).toISOString()
            : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao registrar incidente")
      }

      // Reset form and refresh
      setFormData({
        description: "",
        discoveredAt: new Date().toISOString().split("T")[0],
        occurredAt: "",
        affectedDataCategories: [],
        affectedUserCount: 0,
        riskLevel: "medium",
        mitigationActions: "",
      })
      setShowForm(false)
      fetchIncidents()
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleNotifyAnpd = async (incidentId: string) => {
    if (!confirm("Confirma notificacao a ANPD? Esta acao sera registrada.")) return

    setActionLoading(incidentId)
    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/security-incidents/${incidentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "notify_anpd" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao notificar ANPD")
      }

      fetchIncidents(pagination.page)
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleNotifyUsers = async (incidentId: string) => {
    if (!confirm("Confirma notificacao aos usuarios afetados?")) return

    setActionLoading(incidentId)
    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/security-incidents/${incidentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "notify_users" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao notificar usuarios")
      }

      fetchIncidents(pagination.page)
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading && incidents.length === 0) {
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
        <Button variant="outline" size="sm" onClick={() => fetchIncidents()} className="mt-4">
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
            <Shield className="w-5 h-5" />
            Incidentes de Seguranca
          </h2>
          <p className="text-muted-foreground text-sm">
            {pagination.total} incidentes registrados
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Novo Incidente
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Registrar Novo Incidente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Descricao do Incidente *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  minLength={10}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Descreva o incidente de seguranca..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Data de Descoberta *</label>
                  <Input
                    type="date"
                    value={formData.discoveredAt}
                    onChange={(e) => setFormData({ ...formData, discoveredAt: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Data de Ocorrencia</label>
                  <Input
                    type="date"
                    value={formData.occurredAt}
                    onChange={(e) => setFormData({ ...formData, occurredAt: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Categorias de Dados Afetados *</label>
                <div className="flex flex-wrap gap-2">
                  {dataCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={formData.affectedDataCategories.includes(cat.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleCategoryToggle(cat.id)}
                    >
                      {cat.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Usuarios Afetados *</label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.affectedUserCount}
                    onChange={(e) => setFormData({ ...formData, affectedUserCount: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Nivel de Risco *</label>
                  <select
                    value={formData.riskLevel}
                    onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as typeof formData.riskLevel })}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="low">Baixo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                    <option value="critical">Critico</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Acoes de Mitigacao</label>
                <textarea
                  value={formData.mitigationActions}
                  onChange={(e) => setFormData({ ...formData, mitigationActions: e.target.value })}
                  rows={2}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Descreva as acoes tomadas para mitigar o incidente..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading === "submit" || formData.affectedDataCategories.length === 0}
                >
                  {actionLoading === "submit" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Registrar Incidente"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card key={incident.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge className={riskColors[incident.riskLevel]}>
                      {riskLabels[incident.riskLevel]}
                    </Badge>
                    {incident.notifiedAnpd && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        ANPD Notificada
                      </Badge>
                    )}
                    {incident.notifiedUsers && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        Usuarios Notificados
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-3">{incident.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {incident.affectedDataCategories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {dataCategories.find((c) => c.id === cat)?.label || cat}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {incident.affectedUserCount} usuarios afetados
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Descoberto em {new Date(incident.discoveredAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  {incident.mitigationActions && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-xs font-medium mb-1">Acoes de Mitigacao:</p>
                      <p className="text-sm">{incident.mitigationActions}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {!incident.notifiedAnpd && (incident.riskLevel === "high" || incident.riskLevel === "critical") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNotifyAnpd(incident.id)}
                      disabled={actionLoading === incident.id}
                    >
                      {actionLoading === incident.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Bell className="w-4 h-4 mr-1" />
                          Notificar ANPD
                        </>
                      )}
                    </Button>
                  )}
                  {!incident.notifiedUsers && incident.affectedUserCount > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNotifyUsers(incident.id)}
                      disabled={actionLoading === incident.id}
                    >
                      {actionLoading === incident.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Users className="w-4 h-4 mr-1" />
                          Notificar Usuarios
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {incidents.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum incidente registrado
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
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

      {/* LGPD Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">Art. 48 - Comunicacao de Incidente</h3>
              <p className="text-sm text-muted-foreground mt-1">
                O controlador devera comunicar a autoridade nacional e ao titular a ocorrencia de
                incidente de seguranca que possa acarretar risco ou dano relevante aos titulares.
                A comunicacao deve ser feita em prazo razoavel (3 dias uteis recomendado pela ANPD).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
