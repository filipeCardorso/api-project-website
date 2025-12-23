export interface Snippet {
  language: string
  label: string
  code: string
}

export interface EndpointSnippet {
  name: string
  method: string
  path: string
  description: string
  snippets: Snippet[]
}

export const endpoints: EndpointSnippet[] = [
  {
    name: "Register",
    method: "POST",
    path: "/api/auth/register",
    description: "Registra um novo usuario e envia email de verificacao",
    snippets: [
      {
        language: "curl",
        label: "cURL",
        code: `curl -X POST https://api-project-gules.vercel.app/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Joao Silva",
    "email": "joao@example.com",
    "password": "Senha123"
  }'`,
      },
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch(
  "https://api-project-gules.vercel.app/api/auth/register",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Joao Silva",
      email: "joao@example.com",
      password: "Senha123",
    }),
  }
);

const data = await response.json();
console.log(data.user);`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

response = requests.post(
    "https://api-project-gules.vercel.app/api/auth/register",
    json={
        "name": "Joao Silva",
        "email": "joao@example.com",
        "password": "Senha123"
    }
)

data = response.json()
print(data["user"])`,
      },
    ],
  },
  {
    name: "Login",
    method: "POST",
    path: "/api/auth/login",
    description: "Autentica usuario e retorna tokens",
    snippets: [
      {
        language: "curl",
        label: "cURL",
        code: `curl -X POST https://api-project-gules.vercel.app/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "joao@example.com",
    "password": "Senha123"
  }'`,
      },
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch(
  "https://api-project-gules.vercel.app/api/auth/login",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "joao@example.com",
      password: "Senha123",
    }),
  }
);

const { accessToken, refreshToken, user } = await response.json();`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

response = requests.post(
    "https://api-project-gules.vercel.app/api/auth/login",
    json={
        "email": "joao@example.com",
        "password": "Senha123"
    }
)

data = response.json()
access_token = data["accessToken"]
refresh_token = data["refreshToken"]`,
      },
    ],
  },
  {
    name: "Refresh Token",
    method: "POST",
    path: "/api/auth/refresh",
    description: "Renova access token usando refresh token",
    snippets: [
      {
        language: "curl",
        label: "cURL",
        code: `curl -X POST https://api-project-gules.vercel.app/api/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refreshToken": "seu-refresh-token-aqui"
  }'`,
      },
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch(
  "https://api-project-gules.vercel.app/api/auth/refresh",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: "seu-refresh-token-aqui",
    }),
  }
);

const { accessToken, refreshToken } = await response.json();
// Nota: refresh token e rotacionado a cada uso`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

response = requests.post(
    "https://api-project-gules.vercel.app/api/auth/refresh",
    json={
        "refreshToken": "seu-refresh-token-aqui"
    }
)

data = response.json()
# Nota: refresh token e rotacionado a cada uso
new_access_token = data["accessToken"]
new_refresh_token = data["refreshToken"]`,
      },
    ],
  },
  {
    name: "List Users",
    method: "GET",
    path: "/api/users",
    description: "Lista usuarios com paginacao e busca",
    snippets: [
      {
        language: "curl",
        label: "cURL",
        code: `curl -X GET "https://api-project-gules.vercel.app/api/users?page=1&limit=10&search=joao" \\
  -H "Authorization: Bearer seu-access-token"`,
      },
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch(
  "https://api-project-gules.vercel.app/api/users?page=1&limit=10",
  {
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
    },
  }
);

const { users, pagination } = await response.json();
console.log(\`Total: \${pagination.total} usuarios\`);`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

response = requests.get(
    "https://api-project-gules.vercel.app/api/users",
    params={"page": 1, "limit": 10, "search": "joao"},
    headers={"Authorization": f"Bearer {access_token}"}
)

data = response.json()
users = data["users"]
pagination = data["pagination"]`,
      },
    ],
  },
]

export const apiEndpointsList = [
  { method: "POST", path: "/api/auth/register", tag: "Auth", description: "Registrar usuario" },
  { method: "POST", path: "/api/auth/login", tag: "Auth", description: "Login" },
  { method: "GET", path: "/api/auth/me", tag: "Auth", description: "Dados do usuario" },
  { method: "POST", path: "/api/auth/refresh", tag: "Auth", description: "Renovar token" },
  { method: "POST", path: "/api/auth/logout", tag: "Auth", description: "Logout" },
  { method: "POST", path: "/api/auth/forgot-password", tag: "Auth", description: "Esqueci senha" },
  { method: "POST", path: "/api/auth/reset-password", tag: "Auth", description: "Resetar senha" },
  { method: "GET", path: "/api/auth/verify-email", tag: "Auth", description: "Verificar email" },
  { method: "GET", path: "/api/users", tag: "Users", description: "Listar usuarios" },
  { method: "GET", path: "/api/users/:id", tag: "Users", description: "Buscar usuario" },
  { method: "PUT", path: "/api/users/:id", tag: "Users", description: "Atualizar usuario" },
  { method: "DELETE", path: "/api/users/:id", tag: "Users", description: "Deletar usuario" },
  { method: "PUT", path: "/api/admin/users/:id/role", tag: "Admin", description: "Alterar role" },
  { method: "GET", path: "/api/admin/audit-logs", tag: "Admin", description: "Audit logs" },
  { method: "GET", path: "/api/health", tag: "System", description: "Health check" },
]
