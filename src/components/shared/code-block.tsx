"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = "bash",
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copiar codigo</span>
        </Button>
      </div>

      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono">
          {showLineNumbers ? (
            lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-muted-foreground select-none">
                  {index + 1}
                </span>
                <span>{line}</span>
              </div>
            ))
          ) : (
            code
          )}
        </code>
      </pre>

      {language && (
        <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {language}
        </span>
      )}
    </div>
  )
}
