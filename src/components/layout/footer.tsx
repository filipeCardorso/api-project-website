import Link from "next/link"
import { Container } from "./container"

const footerLinks = {
  produto: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
    { name: "Status", href: "/status" },
  ],
  developers: [
    { name: "Documentacao", href: "/developer" },
    { name: "Swagger UI", href: "https://api-project-gules.vercel.app/docs", external: true },
    { name: "API Reference", href: "/developer#endpoints" },
  ],
  empresa: [
    { name: "Seguranca", href: "/security" },
    { name: "Termos de Uso", href: "#" },
    { name: "Privacidade", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AP</span>
                </div>
                <span className="font-semibold">API Project</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                API RESTful de gerenciamento de usuarios. Autenticacao JWT, rate limiting e audit logs.
              </p>
            </div>

            {/* Produto */}
            <div>
              <h3 className="font-semibold mb-3">Produto</h3>
              <ul className="space-y-3">
                {footerLinks.produto.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h3 className="font-semibold mb-3">Developers</h3>
              <ul className="space-y-3">
                {footerLinks.developers.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                      {link.external && " ↗"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="font-semibold mb-3">Empresa</h3>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} API Project. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/filipeCardorso/api-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
