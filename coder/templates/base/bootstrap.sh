#!/bin/bash
set -euo pipefail

# ==============================================================================
# AI Dev Platform - Coder Workspace Bootstrap Script
# ==============================================================================
#
# This script bootstraps a Coder workspace with the AI development platform.
# It should be run automatically when a workspace is created.
#
# Environment Variables:
#   AI_PLATFORM_REPO    - Git repo for AI platform (default: your-org/ai-dev-platform)
#   AI_PLATFORM_VERSION - Branch/tag to use (default: main)
#   AI_PLATFORM_PATH    - Local path for platform (default: ~/.ai-platform)
#   SKIP_CLAUDE_SETUP   - Set to "true" to skip Claude Code setup
#
# Usage:
#   ./bootstrap.sh              # Bootstrap with defaults
#   AI_PLATFORM_REPO=custom/repo ./bootstrap.sh  # Custom platform repo
#
# ==============================================================================

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $*"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $*"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

# Configuration
PLATFORM_REPO="${AI_PLATFORM_REPO:-ai-dev-platform}"
PLATFORM_VERSION="${AI_PLATFORM_VERSION:-main}"
PLATFORM_PATH="${AI_PLATFORM_PATH:-$HOME/.ai-platform}"
WORKSPACE_PATH="${WORKSPACE_PATH:-/workspace}"

# ==============================================================================
# Functions
# ==============================================================================

# Detect if we're in a git repository
is_git_repo() {
    git rev-parse --git-dir > /dev/null 2>&1
}

# Get GitHub token from Coder environment
get_github_token() {
    # Check for various GitHub token locations
    if [[ -n "${GITHUB_TOKEN:-}" ]]; then
        echo "$GITHUB_TOKEN"
    elif [[ -n "${CODER_GITHUB_TOKEN:-}" ]]; then
        echo "$CODER_GITHUB_TOKEN"
    elif [[ -f "$HOME/.github-token" ]]; then
        cat "$HOME/.github-token"
    else
        echo ""
    fi
}

# Clone or update AI platform
setup_platform_repo() {
    log_info "Setting up AI platform repository..."

    if [[ -d "$PLATFORM_PATH" ]]; then
        log_info "Platform directory exists, updating..."
        cd "$PLATFORM_PATH"
        git fetch origin
        git checkout "$PLATFORM_VERSION"
        git pull origin "$PLATFORM_VERSION"
        log_success "Platform updated to $PLATFORM_VERSION"
    else
        log_info "Cloning platform repository..."
        # Check if we need to use a token
        local token=$(get_github_token)
        if [[ -n "$token" ]]; then
            git clone "https://$token@github.com/$PLATFORM_REPO" "$PLATFORM_PATH"
        else
            git clone "https://github.com/$PLATFORM_REPO" "$PLATFORM_PATH"
        fi
        cd "$PLATFORM_PATH"
        git checkout "$PLATFORM_VERSION"
        log_success "Platform cloned to $PLATFORM_PATH"
    fi
}

# Check if Claude Code is installed
check_claude_code() {
    if command -v claude &> /dev/null; then
        claude --version
        return 0
    else
        return 1
    fi
}

# Install Claude Code
install_claude_code() {
    log_info "Installing Claude Code..."

    if command -v npm &> /dev/null; then
        npm install -g @anthropic-ai/claude-code
        log_success "Claude Code installed"
    elif command -v pnpm &> /dev/null; then
        pnpm add -g @anthropic-ai/claude-code
        log_success "Claude Code installed"
    else
        log_error "npm or pnpm not found. Cannot install Claude Code."
        return 1
    fi
}

# Configure Claude Code with platform agents
configure_claude_code() {
    log_info "Configuring Claude Code with AI platform agents..."

    # Create .ai directory in workspace
    mkdir -p "$WORKSPACE_PATH/.ai/agents"

    # Link custom agents
    if [[ -d "$PLATFORM_PATH/agents/custom" ]]; then
        log_info "Linking custom agents..."
        for agent in "$PLATFORM_PATH/agents/custom"/*.md; do
            if [[ -f "$agent" ]]; then
                ln -sf "$agent" "$WORKSPACE_PATH/.ai/agents/"
                log_success "Linked: $(basename "$agent")"
            fi
        done
    fi

    # Link Every agents if available
    if [[ -d "$PLATFORM_PATH/agents/every" ]]; then
        log_info "Linking Every agents..."
        ln -sf "$PLATFORM_PATH/agents/every" "$WORKSPACE_PATH/.ai/agents/every"
    fi

    # Try to install Every's plugin
    log_info "Attempting to install Every's Compound Engineering plugin..."
    claude /plugin marketplace add https://github.com/EveryInc/every-marketplace 2>/dev/null || true
    claude /plugin install compound-engineering 2>/dev/null || true

    log_success "Claude Code configured"
}

# Create AI config file
create_ai_config() {
    local config_file="$WORKSPACE_PATH/.ai/ai.config.yaml"

    if [[ -f "$config_file" ]]; then
        log_info "AI config already exists at $config_file"
        return 0
    fi

    log_info "Creating AI config file..."

    cat > "$config_file" << 'EOF'
# AI Development Platform Configuration
# Generated by bootstrap.sh

# Platform repository reference
platform:
  repo: ai-dev-platform
  version: main

# Technology stack
stack:
  # Frontend framework
  frontend: nextjs  # Options: nextjs, react, vue, svelte

  # Backend framework
  backend: go  # Options: go, node, python, rust

  # API style
  api: graphql  # Options: graphql, rest, grpc

  # Database
  database: postgresql  # Options: postgresql, mysql, mongodb, sqlite

# Development rules
rules:
  # Reuse existing code before creating new
  reuseBeforeCreate: true

  # Require architecture plan before implementation
  requireArchitecturePlan: true

  # Require Playwright tests for new features
  requirePlaywrightTests: true

  # Run AI review before PR merge
  requireAIReview: true

# Testing configuration
testing:
  # E2E testing framework
  e2e: playwright

  # Unit testing framework (auto-detected)
  unit: auto

# CI/CD integration
ci:
  # Enable AI PR checks
  enabled: true

  # Platform workflow ref
  workflowRef: main
EOF

    log_success "Created AI config at $config_file"
}

# Detect project structure and create repo map
detect_project_structure() {
    local repo_map="$WORKSPACE_PATH/.ai/repo-map.yaml"

    if [[ -f "$repo_map" ]]; then
        log_info "Repo map already exists at $repo_map"
        return 0
    fi

    log_info "Detecting project structure..."

    cat > "$repo_map" << 'EOF'
# Repository Structure Map
# Generated by bootstrap.sh

# Services - major backend components
services:
  # Add your services here
  # example:
  # - name: auth
  #   location: services/auth
  #   responsibilities:
  #     - user authentication
  #     - session management
  #   reuseRequired: true

# Utilities - shared helper functions
utilities:
  # Add your utilities here
  # example:
  # - location: pkg/database
  #   purpose: Database connection and query helpers

# Patterns - common patterns in the codebase
patterns:
  # Add your patterns here
  # example:
  # - name: error-handling
  #   description: All errors are wrapped with context
  #   example: |
  #     if err != nil {
  #       return fmt.Errorf("operation failed: %w", err)
  #     }
EOF

    log_success "Created repo map at $repo_map"
}

# Create sample GitHub Actions workflow
create_github_workflow() {
    local workflow_dir="$WORKSPACE_PATH/.github/workflows"

    if [[ -d "$workflow_dir" ]]; then
        log_info "GitHub workflows directory exists"
        return 0
    fi

    log_info "Creating GitHub Actions workflow..."

    mkdir -p "$workflow_dir"

    cat > "$workflow_dir/ai-check.yml" << 'EOF'
name: AI Platform Check

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches: [main, develop]

jobs:
  ai-platform-check:
    uses: your-org/ai-dev-platform/.github/workflows/ai-pr-check.yml@main
    secrets: inherit
    with:
      platform-ref: main
      enable-playwright: true

  e2e-tests:
    uses: your-org/ai-dev-platform/.github/workflows/playwright-e2e.yml@main
    secrets: inherit
    with:
      base-url: 'http://localhost:3000'
EOF

    log_success "Created GitHub workflow at $workflow_dir/ai-check.yml"
}

# Initialize git repository if needed
init_git_repo() {
    if ! is_git_repo; then
        log_info "Initializing git repository..."
        git init
        log_success "Git repository initialized"
    fi
}

# Display platform info
show_platform_info() {
    echo ""
    echo "================================"
    echo "  AI Development Platform Ready  "
    echo "================================"
    echo ""
    echo "Platform: $PLATFORM_REPO@$PLATFORM_VERSION"
    echo "Location: $PLATFORM_PATH"
    echo "Workspace: $WORKSPACE_PATH"
    echo ""
    echo "Available Commands:"
    echo "  claude /compound-engineering:plan <feature>   - Create detailed plan"
    echo "  claude /compound-engineering:work <plan>      - Execute plan"
    echo "  claude /compound-engineering:review <pr>      - Review PR"
    echo ""
    echo "Configuration:"
    echo "  .ai/ai.config.yaml    - Platform configuration"
    echo "  .ai/repo-map.yaml     - Repository structure"
    echo ""
    echo "Next Steps:"
    echo "  1. Edit .ai/ai.config.yaml with your stack"
    echo "  2. Update .ai/repo-map.yaml with your structure"
    echo "  3. Create your first feature plan"
    echo ""
}

# ==============================================================================
# Main
# ==============================================================================

main() {
    echo ""
    log_info "AI Dev Platform - Bootstrap Script"
    echo ""

    # Setup platform repo
    setup_platform_repo

    # Install and configure Claude Code (unless skipped)
    if [[ "${SKIP_CLAUDE_SETUP:-}" != "true" ]]; then
        if ! check_claude_code; then
            install_claude_code
        fi
        configure_claude_code
    else
        log_warning "Skipping Claude Code setup"
    fi

    # Create configuration files
    create_ai_config
    detect_project_structure
    create_github_workflow

    # Initialize git if needed
    init_git_repo

    # Show info
    show_platform_info

    log_success "Bootstrap complete!"
}

# Run main function
main "$@"
