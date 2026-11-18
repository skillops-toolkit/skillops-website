import type { Locale } from "@/i18n/translations";

export type LibraryModuleKind = "skill" | "subagent";

export interface LibraryCatalogItem {
  /** Unique CLI slug used in `npx skillops-cli@latest add <slug>` */
  slug: string;
  /** Module type: "skill" or "subagent" */
  kind: LibraryModuleKind;
  /** Semantic version badge */
  version: string;
  /** Domain track displayed on the card header */
  track: string;
  /**
   * Searchable & clickable tags (without the '#' prefix).
   * Any tag added here automatically appears in the Library tag filter bar!
   * Tip: include macro tags ("frontend", "backend", "security", "ai", "devops")
   * alongside specific tech tags ("mcp", "dotenv", "react", etc.).
   */
  tags: string[];
  /** Concise, human-readable summary for each supported language */
  summary: Record<Locale, string>;
}

/**
 * ============================================================================
 * SKILLOPS LIBRARY CATALOG REGISTRY
 * ============================================================================
 * To add a new Skill or Subagent to the `/library` page, simply append a new
 * object to `LIBRARY_CATALOG` below following this template:
 *
 * {
 *   slug: "my-new-skill",
 *   kind: "skill", // or "subagent"
 *   version: "v1.0.0",
 *   track: "frontend",
 *   tags: ["frontend", "react", "nextjs", "performance"],
 *   summary: {
 *     en: "Short 1-2 sentence description in English.",
 *     "pt-BR": "Descrição curta de 1-2 frases em Português.",
 *     es: "Descripción corta de 1-2 frases en Español."
 *   }
 * }
 * ============================================================================
 */
export const LIBRARY_CATALOG: LibraryCatalogItem[] = [
  {
    slug: "mcp-architect",
    kind: "skill",
    version: "v1.0.0",
    track: "ai-engineering",
    tags: ["backend", "ai", "mcp", "fastmcp", "json-rpc"],
    summary: {
      en: "Design, implement, and audit Model Context Protocol (MCP) servers and FastMCP tools with strict JSON-RPC stdio hygiene and typed schemas.",
      "pt-BR":
        "Projete, implemente e audite servidores Model Context Protocol (MCP) e ferramentas FastMCP com higiene estrita de stdio JSON-RPC e schemas tipados.",
      es: "Diseña, implementa y audita servidores Model Context Protocol (MCP) y herramientas FastMCP con estricta higiene de stdio JSON-RPC y esquemas tipados."
    }
  },
  {
    slug: "env-secrets-guard",
    kind: "skill",
    version: "v1.0.0",
    track: "arch-quality",
    tags: ["security", "backend", "devops", "dotenv", "secrets"],
    summary: {
      en: "Prevent credential leaks before commit by scanning for hardcoded API keys, unignored .env files, and missing .env.example templates.",
      "pt-BR":
        "Previna vazamento de credenciais antes do commit detectando chaves de API hardcoded, arquivos .env rastreados pelo Git e falta de .env.example.",
      es: "Previene fugas de credenciales antes del commit detectando claves de API hardcoded, archivos .env rastreados por Git y plantillas .env.example faltantes."
    }
  },
  {
    slug: "context-scout",
    kind: "subagent",
    version: "v1.0.0",
    track: "exploration",
    tags: ["architecture", "ai", "read-only", "cartography"],
    summary: {
      en: "Read-only codebase cartographer running in an isolated context window to map entrypoints, call graphs, and exact file line ranges.",
      "pt-BR":
        "Cartógrafo de código somente leitura executado em uma janela de contexto isolada para mapear entrypoints, call graphs e intervalos exatos de linhas.",
      es: "Cartógrafo de código de solo lectura ejecutado en una ventana de contexto aislada para mapear entrypoints, call graphs y rangos exactos de líneas."
    }
  },
  {
    slug: "fastapi-async-guard",
    kind: "skill",
    version: "v1.0.0",
    track: "python-backend",
    tags: ["backend", "python", "fastapi", "async", "pydantic"],
    summary: {
      en: "Audit FastAPI async route handlers for event-loop blocking I/O calls, untyped dependencies, and Pydantic v2 validation hygiene.",
      "pt-BR":
        "Audite rotas assíncronas do FastAPI contra chamadas síncronas bloqueantes no event loop, dependências sem tipagem e higiene de schemas Pydantic v2.",
      es: "Audita rutas asíncronas de FastAPI contra llamadas síncronas bloqueantes en el event loop, dependencias sin tipado e higiene de esquemas Pydantic v2."
    }
  },
  {
    slug: "context-budget-profiler",
    kind: "skill",
    version: "v1.0.0",
    track: "token-economy",
    tags: ["ai", "tokens", "context-engineering", "performance", "audit"],
    summary: {
      en: "Profile repository Startup Token Tax across CLAUDE.md, AGENTS.md, IDE rule folders, and MCP schemas to eliminate context window bloat.",
      "pt-BR":
        "Analise o Startup Token Tax do repositório em CLAUDE.md, AGENTS.md, pastas de regras de IDEs e schemas MCP para eliminar desperdício de contexto.",
      es: "Analiza el Startup Token Tax del repositorio en CLAUDE.md, AGENTS.md, carpetas de reglas de IDEs y esquemas MCP para eliminar el exceso de contexto."
    }
  },
  {
    slug: "security-diff-reviewer",
    kind: "subagent",
    version: "v1.0.0",
    track: "security",
    tags: ["security", "ai", "read-only", "code-review", "owasp"],
    summary: {
      en: "Read-only security specialist running in an isolated context window to audit diffs for OWASP vulnerabilities, secret leaks, and trust-boundary regressions.",
      "pt-BR":
        "Especialista de segurança somente leitura em janela de contexto isolada para auditar diffs contra vulnerabilidades OWASP, vazamento de segredos e regressões de fronteira.",
      es: "Especialista de seguridad de solo lectura en ventana de contexto aislada para auditar diffs contra vulnerabilidades OWASP, fugas de secretos y regresiones de frontera."
    }
  }
];
