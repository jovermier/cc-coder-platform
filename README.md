# CC Coder Platform

A centralized AI-powered development platform for Coder workspaces, providing specialized Claude Code agents, reusable workflows, and testing infrastructure.

## Overview

This platform combines **Every Inc's Compound Engineering Plugin** with custom agents for modern web development, creating a comprehensive AI-assisted development workflow optimized for Coder environments.

**Key Features:**
- 4 specialized code review agents (Next.js, Go, GraphQL, Playwright)
- Reusable GitHub Actions workflows for CI/CD
- Playwright E2E testing infrastructure
- Coder workspace integration with auto-bootstrap
- Shared prompt templates and configuration schemas

## Quick Start

### For New Projects

```bash
# 1. Clone the platform
git clone https://github.com/jovermier/cc-coder-platform.git ~/.cc-platform

# 2. Link agents to your project
cd /path/to/your/project
mkdir -p .ai/agents
ln -sf ~/.cc-platform/agents/cc-stack-agents .ai/agents/

# 3. Add Every plugin (submodule)
git submodule add https://github.com/EveryInc/compound-engineering-plugin .ai/agents/every

# 4. Copy configuration templates
cp ~/.cc-platform/schemas/*.json .ai/
cp ~/.cc-platform/prompts/*.md .ai/
```

### For Coder Workspaces

The platform includes a Coder template that automatically bootstraps workspaces:

```bash
# When creating a workspace, the bootstrap script will:
# - Clone the CC Coder Platform
# - Install Claude Code
# - Link cc-stack-agents and every plugins
# - Create configuration files
```

## Platform Structure

```
cc-coder-platform/
├── agents/
│   ├── every/                    # Every Inc's plugin (submodule)
│   └── cc-stack-agents/           # Custom stack agents (submodule)
│       ├── agents/
│       │   ├── review/           # Code review agents
│       │   └── workflow/         # Workflow agents
│       └── skills/               # Domain knowledge skills
├── prompts/
│   ├── architecture-plan.md
│   ├── feature-implementation.md
│   └── bugfix.md
├── workflows/
│   ├── ai-pr-check.yml           # Reusable AI PR check workflow
│   └── playwright-e2e.yml        # Reusable E2E test workflow
├── testing/
│   └── playwright/
│       ├── base.config.ts
│       └── helpers/
│           ├── auth.ts
│           └── navigation.ts
├── schemas/
│   ├── ai-config.schema.json
│   └── repo-map.schema.json
├── coder/
│   └── templates/
│       └── base/
│           ├── bootstrap.sh
│           └── template.json
└── examples/
    └── pilot-project/
        └── .ai/
            ├── ai.config.yaml
            └── repo-map.yaml
```

## Custom Agents (cc-stack-agents)

### Next.js Reviewer
Reviews Next.js code for framework best practices, Server/Client component usage, performance optimizations, and App Router patterns.

**Location:** [agents/cc-stack-agents/agents/review/nextjs-reviewer.md](agents/cc-stack-agents/agents/review/nextjs-reviewer.md)

**Key Checks:**
- Server vs Client Components
- Image optimization with `next/image`
- Proper `<Link>` usage
- Metadata API usage
- Data fetching patterns

### Go Reviewer
Reviews Go code for idiomatic patterns, concurrency safety, and best practices.

**Location:** [agents/cc-stack-agents/agents/review/go-reviewer.md](agents/cc-stack-agents/agents/review/go-reviewer.md)

**Key Checks:**
- Error handling (no ignored errors)
- Goroutine leaks
- Context propagation
- Interface design
- Performance patterns

### GraphQL Reviewer
Reviews GraphQL schemas, resolvers, and queries for best practices.

**Location:** [agents/cc-stack-agents/agents/review/graphql-reviewer.md](agents/cc-stack-agents/agents/review/graphql-reviewer.md)

**Key Checks:**
- N+1 query prevention
- Schema design patterns
- Error handling
- Security considerations
- Pagination patterns

### Playwright Generator
Generates Playwright E2E tests from feature descriptions using Page Object Model.

**Location:** [agents/cc-stack-agents/agents/workflow/playwright-generator.md](agents/cc-stack-agents/agents/workflow/playwright-generator.md)

**Generates:**
- Page objects
- Test fixtures
- E2E test suites
- Test helpers

## CI/CD Workflows

### AI PR Check Workflow

A reusable GitHub Actions workflow that runs AI-powered code review on PRs.

**File:** [workflows/ai-pr-check.yml](workflows/ai-pr-check.yml)

**Features:**
- Auto-detects project stack
- Runs specialized reviewers
- Posts results as PR comments
- Includes security scanning
- Runs code quality checks

**Usage:**
```yaml
# In your project's .github/workflows/ai-check.yml
jobs:
  ai-platform-check:
    uses: jovermier/cc-coder-platform/.github/workflows/ai-pr-check.yml@main
    secrets: inherit
```

### Playwright E2E Workflow

A reusable workflow for running Playwright E2E tests across multiple browsers.

**File:** [workflows/playwright-e2e.yml](workflows/playwright-e2e.yml)

**Features:**
- Multi-browser testing (Chromium, Firefox, WebKit)
- Responsive design testing
- Visual regression detection
- Test sharding for parallel runs
- Automated PR comments with results

## Configuration

### ai.config.yaml

Main platform configuration file for each project.

```yaml
# Platform reference
platform:
  repo: cc-coder-platform

# Technology stack
stack:
  frontend: nextjs
  backend: go
  api: graphql
  database: postgresql

# Development rules
rules:
  reuseBeforeCreate: true
  requireArchitecturePlan: true
  requirePlaywrightTests: true
  requireAIReview: true

# Testing
testing:
  e2e: playwright
  unit: auto

# CI/CD
ci:
  enabled: true
```

### repo-map.yaml

Documents the repository structure for AI context.

```yaml
services:
  auth:
    location: services/auth
    responsibilities:
      - user authentication
      - session management
    reuseRequired: true

utilities:
  - location: pkg/database
    purpose: Database connection helpers
  - location: pkg/logger
    purpose: Structured logging

patterns:
  - name: error-handling
    description: All errors wrapped with context
    example: |
      return fmt.Errorf("operation failed: %w", err)
```

## Using Claude Code

### Planning Features

```bash
# Create a detailed plan from a feature description
claude /compound-engineering:plan "Add user authentication with OAuth providers"

# Plan detail levels: minimal, more, a lot
claude /compound-engineering:plan "Add user profiles" --detail more
```

### Implementing Features

```bash
# Execute a plan document
claude /compound-engineering:work path/to/plan.md
```

### Reviewing Code

```bash
# Review current PR
claude /compound-engineering:review

# Review specific PR
claude /compound-engineering:review 123

# Review from URL
claude /compound-engineering:review https://github.com/user/repo/pull/123
```

## Coder Integration

The platform includes a Coder template for automatic workspace setup.

**Bootstrap Script:** [coder/templates/base/bootstrap.sh](coder/templates/base/bootstrap.sh)

**Environment Variables:**
- `CC_PLATFORM_REPO` - Platform repository (default: cc-coder-platform)
- `SKIP_CLAUDE_SETUP` - Skip Claude Code installation (default: false)

## Examples

See [examples/pilot-project/](examples/pilot-project/) for a complete example configuration.

## Status

| Component | Status |
|-----------|--------|
| cc-stack-agents | ✅ Complete |
| every plugin | ✅ Submodule |
| GitHub Actions Workflows | ✅ Complete |
| Playwright Base Config | ✅ Complete |
| Coder Template | ✅ Complete |
| Configuration Schemas | ✅ Complete |
| Prompt Templates | ✅ Complete |
| Documentation | ✅ Complete |

## Contributing

When adding new agents or workflows:

1. Create the agent definition file in `agents/cc-stack-agents/`
2. Update this README with documentation
3. Add examples in `examples/pilot-project/`
4. Test with the pilot project

## License

MIT

---

**Part of the CC Coder Platform** - Making each unit of engineering work easier than the last.
