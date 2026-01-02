# AI Platform

This directory contains the actual platform implementation. Currently a scaffold; to be populated during implementation.

## Structure

```
platform/
├── agents/          # Agent definitions (Every + custom)
├── prompts/         # Shared prompt templates
├── workflows/       # Reusable CI/CD workflows
├── testing/         # Shared test configurations
├── schemas/         # Configuration schemas
└── examples/        # Example configurations
```

## Status

🚧 **Under Construction** - See [../docs/implementation-plan.md](../docs/implementation-plan.md) for the implementation roadmap.

## Next Steps

1. Integrate Every's Compound Engineering Plugin as a submodule
2. Create custom agents for Next.js/Go/GraphQL
3. Build reusable GitHub Actions workflows
4. Set up Playwright base configuration

See the [implementation plan](../docs/implementation-plan.md) for details.
