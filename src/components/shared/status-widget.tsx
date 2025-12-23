"use client"

import { useEffect, useState, useCallback } from "react"
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HealthData {
  status: "healthy" | "unhealthy"
  timestamp: string
  uptime: number
  responseTime: string
  checks: {
    database: {
      status: string
      latency: string | null
      error: string | null
    }
  }
  system: {
    memory: {
      heapUsed: string
      heapTotal: string
      rss: string
    }
    nodeVersion: string
  }
}

export function StatusWidget() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const fetchHealth = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Use local API route to avoid CORS issues
      const response = await fetch("/api/health", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setHealth(data)
      setLastChecked(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar")
      setHealth(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHealth()
  }, [fetchHealth])

  const isHealthy = health?.status === "healthy"
  const dbConnected = health?.checks?.database?.status === "connected"

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Status da API</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchHealth}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && !health ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 text-destructive">
            <XCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Erro ao verificar status</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        ) : health ? (
          <>
            {/* Overall status */}
            <div className="flex items-center gap-3">
              {isHealthy ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <p className="font-medium">
                  {isHealthy ? "Todos os sistemas operacionais" : "Problemas detectados"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Response time: {health.responseTime}
                </p>
              </div>
              <Badge
                variant={isHealthy ? "success" : "destructive"}
                className="ml-auto"
              >
                {health.status}
              </Badge>
            </div>

            {/* Services */}
            <div className="space-y-2 pt-2 border-t border-border">
              {/* API */}
              <div className="flex items-center justify-between text-sm">
                <span>API</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {health.responseTime}
                  </span>
                  {isHealthy ? (
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
              </div>

              {/* Database */}
              <div className="flex items-center justify-between text-sm">
                <span>Database</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {health.checks?.database?.latency || "N/A"}
                  </span>
                  {dbConnected ? (
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
              </div>
            </div>

            {/* System info */}
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              <p>Node: {health.system?.nodeVersion}</p>
              <p>Memory: {health.system?.memory?.heapUsed} / {health.system?.memory?.heapTotal}</p>
              {lastChecked && (
                <p className="mt-1">
                  Ultima verificacao: {lastChecked.toLocaleTimeString("pt-BR")}
                </p>
              )}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
