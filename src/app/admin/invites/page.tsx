"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  Loader2,
  AlertTriangle,
  Mail,
  Clock,
  Crown,
  Shield,
  RefreshCw,
  Trash2,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface Invite {
  id: string
  email: string
  role: string
  status: string
  expiresAt: string
  createdAt: string
  acceptedAt: string | null
  invitedBy: {
    id: number
    name: string
    email: string
  }
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  accepted: "bg-green-500/10 text-green-700 border-green-500/30",
  expired: "bg-gray-500/10 text-gray-700 border-gray-500/30",
  cancelled: "bg-red-500/10 text-red-700 border-red-500/30",
}

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  accepted: "Aceito",
  expired: "Expirado",
  cancelled: "Cancelado",
}

const roleLabels: Record<string, string> = {
  admin: "Admin",
  super_admin: "Super Admin",
}

export default function AdminInvitesPage() {
  const { getToken, user } = useAuth()
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ email: "", role: "admin" })
  const [submitting, setSubmitting] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const isSuperAdmin = user?.role === "super_admin"

  const fetchInvites = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/invites`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar convites")
      }

      const data = await response.json()
      setInvites(data.invites)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    fetchInvites()
  }, [fetchInvites])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/invites`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar convite")
      }

      // Reset form and refresh list
      setFormData({ email: "", role: "admin" })
      setShowForm(false)
      fetchInvites()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar este convite?")) return

    setActionLoading(id)
    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/invites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao cancelar convite")
      }

      fetchInvites()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleResend = async (id: string) => {
    setActionLoading(id)
    try {
      const token = getToken()
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_URL}/api/admin/invites/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao reenviar convite")
      }

      fetchInvites()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const pendingInvites = invites.filter((i) => i.status === "pending")
  const otherInvites = invites.filter((i) => i.status !== "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Convites de Admin
          </h2>
          <p className="text-muted-foreground text-sm">
            Gerencie convites para novos administradores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchInvites}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Convite
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* New Invite Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enviar Novo Convite</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tipo de Admin</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="admin">Admin</option>
                    {isSuperAdmin && (
                      <option value="super_admin">Super Admin</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Enviar Convite
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                O convidado receberá um email com link para criar sua conta de administrador.
                O convite expira em 24 horas.
              </p>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              Convites Pendentes ({pendingInvites.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      {invite.role === "super_admin" ? (
                        <Crown className="w-5 h-5 text-purple-500" />
                      ) : (
                        <Shield className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{invite.email}</span>
                        <Badge variant="outline" className={statusColors[invite.status]}>
                          {statusLabels[invite.status]}
                        </Badge>
                        <Badge variant="secondary">
                          {roleLabels[invite.role]}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Convidado por {invite.invitedBy.name} •
                        Expira em {new Date(invite.expiresAt).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResend(invite.id)}
                      disabled={actionLoading === invite.id}
                    >
                      {actionLoading === invite.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(invite.id)}
                      disabled={actionLoading === invite.id}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* History */}
      {otherInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Convites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {otherInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-4 border rounded-lg opacity-75"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      {invite.status === "accepted" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{invite.email}</span>
                        <Badge variant="outline" className={statusColors[invite.status]}>
                          {statusLabels[invite.status]}
                        </Badge>
                        <Badge variant="secondary">
                          {roleLabels[invite.role]}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Convidado por {invite.invitedBy.name} •
                        {invite.acceptedAt
                          ? ` Aceito em ${new Date(invite.acceptedAt).toLocaleString("pt-BR")}`
                          : ` Criado em ${new Date(invite.createdAt).toLocaleString("pt-BR")}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {invites.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Nenhum convite enviado</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Envie convites para adicionar novos administradores ao sistema.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Enviar Primeiro Convite
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Crown className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">Sistema de Convites</h3>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Convites expiram em 24 horas</li>
                <li>• Admins podem convidar outros admins</li>
                <li>• Apenas Super Admins podem convidar Super Admins</li>
                <li>• Se o email já estiver cadastrado, o usuário será promovido automaticamente</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
