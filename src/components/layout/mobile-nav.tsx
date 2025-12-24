"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface MobileNavProps {
  open: boolean
  onClose: () => void
  navigation: { name: string; href: string }[]
}

export function MobileNav({ open, onClose, navigation }: MobileNavProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-y-0 right-0 left-auto h-full w-full max-w-xs rounded-none border-l translate-x-0 translate-y-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right">
        <DialogTitle className="sr-only">Menu de navegacao</DialogTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AP</span>
              </div>
              <span className="font-semibold">API Project</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="p-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login" onClick={onClose}>Entrar</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/signup" onClick={onClose}>Comecar gratis</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
