import { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Shield, Mail, Clock, FileText, Users, Lock, Globe, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Politica de Privacidade",
  description: "Politica de Privacidade do API Project conforme a Lei Geral de Protecao de Dados (LGPD).",
}

const sections = [
  {
    id: "controlador",
    icon: Users,
    title: "1. Controlador dos Dados",
    content: `O API Project ("nos", "nosso" ou "Controlador") e responsavel pelo tratamento dos seus dados pessoais.

Para questoes relacionadas a privacidade, entre em contato:
- Email: privacy@apiproject.com
- Endereco: [Endereco da empresa]
- DPO (Encarregado de Dados): dpo@apiproject.com`,
  },
  {
    id: "dados-coletados",
    icon: FileText,
    title: "2. Dados Pessoais Coletados",
    content: `Coletamos os seguintes dados pessoais:

**Dados de Cadastro:**
- Nome completo
- Endereco de email
- Senha (armazenada de forma criptografada)

**Dados de Uso:**
- Enderecos IP (anonimizados apos 30 dias)
- Logs de acesso e atividade
- Informacoes do dispositivo e navegador

**Dados de Pagamento (se aplicavel):**
- Processados por terceiros (gateways de pagamento)
- Nao armazenamos dados de cartao de credito`,
  },
  {
    id: "finalidades",
    icon: Shield,
    title: "3. Finalidades do Tratamento",
    content: `Utilizamos seus dados para:

**Base Legal: Execucao de Contrato (Art. 7, V)**
- Fornecer acesso a API e servicos contratados
- Gerenciar sua conta de usuario
- Processar autenticacao e seguranca

**Base Legal: Consentimento (Art. 7, I)**
- Enviar comunicacoes de marketing (opt-in)
- Coletar cookies de analytics e marketing
- Personalizar sua experiencia

**Base Legal: Interesse Legitimo (Art. 7, IX)**
- Melhorar nossos servicos e produtos
- Prevenir fraudes e garantir seguranca
- Cumprir obrigacoes legais e regulatorias`,
  },
  {
    id: "direitos",
    icon: Lock,
    title: "4. Seus Direitos (LGPD Art. 18)",
    content: `Voce tem os seguintes direitos sobre seus dados:

1. **Acesso** - Solicitar copia dos seus dados pessoais
2. **Correcao** - Corrigir dados incompletos ou desatualizados
3. **Anonimizacao** - Solicitar anonimizacao de dados desnecessarios
4. **Portabilidade** - Receber seus dados em formato estruturado
5. **Eliminacao** - Solicitar exclusao dos dados (com periodo de 30 dias)
6. **Revogacao** - Revogar consentimento a qualquer momento
7. **Informacao** - Saber com quem seus dados foram compartilhados

Para exercer seus direitos, acesse o [Portal de Privacidade](/account/privacy) ou envie email para privacy@apiproject.com.`,
  },
  {
    id: "compartilhamento",
    icon: Globe,
    title: "5. Compartilhamento de Dados",
    content: `Podemos compartilhar seus dados com:

**Processadores de Dados:**
- Vercel (hospedagem e infraestrutura)
- Neon (banco de dados PostgreSQL)
- Resend (envio de emails transacionais)
- Axiom (logs e monitoramento)

**Terceiros (somente com consentimento):**
- Ferramentas de analytics
- Plataformas de marketing

**Obrigacoes Legais:**
- Autoridades publicas quando exigido por lei

Todos os processadores sao obrigados contratualmente a proteger seus dados conforme a LGPD.`,
  },
  {
    id: "retencao",
    icon: Clock,
    title: "6. Retencao de Dados",
    content: `Mantemos seus dados pelo tempo necessario:

| Tipo de Dado | Periodo de Retencao |
|--------------|---------------------|
| Dados de conta | Enquanto conta ativa + 5 anos |
| Logs de acesso | 12 meses |
| Dados de pagamento | 5 anos (obrigacao fiscal) |
| Consentimentos | 3 anos apos revogacao |
| Conta excluida | 30 dias (grace period) |

Apos os periodos, os dados sao anonimizados ou excluidos permanentemente.`,
  },
  {
    id: "seguranca",
    icon: Shield,
    title: "7. Seguranca dos Dados",
    content: `Implementamos medidas tecnicas e organizacionais:

**Medidas Tecnicas:**
- Criptografia em transito (TLS 1.3)
- Senhas hasheadas com bcrypt (12 rounds)
- Tokens JWT com rotacao automatica
- Rate limiting contra ataques de forca bruta

**Medidas Organizacionais:**
- Acesso restrito baseado em funcao
- Audit logs de todas as operacoes
- Treinamento de equipe em seguranca
- Plano de resposta a incidentes`,
  },
  {
    id: "incidentes",
    icon: AlertTriangle,
    title: "8. Incidentes de Seguranca",
    content: `Em caso de incidente de seguranca que possa acarretar risco ou dano relevante aos titulares:

1. Notificaremos a ANPD em ate 3 dias uteis
2. Comunicaremos os titulares afetados
3. Descreveremos a natureza dos dados afetados
4. Informaremos as medidas tomadas

Conforme LGPD Art. 48.`,
  },
  {
    id: "cookies",
    icon: FileText,
    title: "9. Cookies e Tecnologias Similares",
    content: `Utilizamos cookies conforme descrito em nossa [Politica de Cookies](/cookie-policy).

**Categorias:**
- Essenciais: Necessarios para funcionamento
- Analytics: Metricas de uso (com consentimento)
- Marketing: Publicidade (com consentimento)
- Performance: Otimizacao (com consentimento)

Voce pode gerenciar suas preferencias de cookies a qualquer momento.`,
  },
  {
    id: "alteracoes",
    icon: FileText,
    title: "10. Alteracoes nesta Politica",
    content: `Podemos atualizar esta politica periodicamente.

Notificaremos sobre alteracoes significativas por:
- Email para usuarios cadastrados
- Aviso no site por 30 dias
- Atualizacao da data de revisao

Ultima atualizacao: ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Politica de Privacidade</h1>
          <p className="text-lg text-muted-foreground">
            Esta politica descreve como coletamos, usamos e protegemos seus dados pessoais,
            em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).
          </p>
        </div>

        {/* Table of Contents */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-muted/50 rounded-xl p-6">
            <h2 className="font-semibold mb-4">Indice</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold pt-1.5">{section.title}</h2>
              </div>
              <div className="pl-14">
                <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
                  {section.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground whitespace-pre-line mb-4">
                      {paragraph.split(/(\[.*?\]\(.*?\))/).map((part, j) => {
                        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
                        if (linkMatch) {
                          return (
                            <Link key={j} href={linkMatch[2]} className="text-primary hover:underline">
                              {linkMatch[1]}
                            </Link>
                          )
                        }
                        return part
                      })}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Duvidas sobre Privacidade?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Entre em contato com nosso Encarregado de Protecao de Dados (DPO) para
                  esclarecer duvidas ou exercer seus direitos.
                </p>
                <a
                  href="mailto:dpo@apiproject.com"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  dpo@apiproject.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
