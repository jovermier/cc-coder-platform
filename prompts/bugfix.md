# Bug Fix Prompt

> This prompt guides AI agents through debugging and fixing issues in the codebase.

## Bug Report Template

```yaml
Bug ID:              [Issue number or identifier]
Title:               [Brief description]
Severity:            [Critical | High | Medium | Low]
Status:              [Open | In Progress | Verified]
Reporter:            [Who reported it]
Assigned:            [Who is fixing it]
```

---

## 1. Bug Description

### Summary
[Brief description of what's wrong]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Steps to Reproduce
1. [Step one]
2. [Step two]
3. [Step three]

### Environment
- URL/Route: `[where it occurs]`
- Browser/Version: `[if applicable]`
- User Role: `[who experiences it]`
- Data State: `[relevant data conditions]`

---

## 2. Investigation

### Reproduce the Bug
- [ ] Can reproduce locally
- [ ] Can reproduce in staging
- [ ] Cannot reproduce (intermittent)

### Initial Assessment
| Question | Answer |
|----------|--------|
| When did this start? | [Date/time/commit] |
| Was this working before? | [Yes/No] |
| Recent changes? | [Commits/PRs to investigate] |
| Affected users? | [All/specific segment] |
| Error messages? | [Copy exact error] |
| Browser console? | [Any errors/warnings] |
| Network requests? | [Failed requests] |
| Logs? | [Relevant log entries] |

### Root Cause Hypothesis
Based on investigation, what is the likely cause?

- [Hypothesis 1] - Evidence: `[what supports this]`
- [Hypothesis 2] - Evidence: `[what supports this]`

---

## 3. Fix Strategy

### Approach
| Option | Description | Pros | Cons | Decision |
|--------|-------------|------|------|----------|
| [Option A] | [What it involves] | [Benefits] | [Drawbacks] | [ ] Selected |
| [Option B] | [What it involves] | [Benefits] | [Drawbacks] | [ ] Selected |

### Implementation Plan
1. [Step 1 - what to change]
2. [Step 2 - what to change]
3. [Step 3 - verification]

### Risk Assessment
| Risk | Impact | Mitigation |
|------|--------|------------|
| [What could break] | [High/Med/Low] | [How to prevent] |

---

## 4. Code Changes

### Files to Modify
- [ ] `[file path]` - [what needs to change]
- [ ] `[file path]` - [what needs to change]

### Change Details

#### Before (Problematic Code)
```language
// Show the problematic code
```

#### After (Fixed Code)
```language
// Show the fixed code
```

#### Explanation
[Why this fixes the bug]

---

## 5. Testing the Fix

### Reproduction Test
Verify the fix by reproducing the original bug:

```typescript
// Test case
test('bug description', async () => {
  // Steps to reproduce
  // Verify fix works
})
```

### Regression Tests
Ensure the fix doesn't break existing functionality:

- [ ] Related feature A works
- [ ] Related feature B works
- [ ] Edge case still handled

### Manual Testing Checklist
- [ ] Reproduce original bug - should be fixed
- [ ] Test related functionality
- [ ] Test in different browsers (if applicable)
- [ ] Test with different user roles
- [ ] Test edge cases

---

## 6. Verification

### Acceptance Criteria
- [ ] Bug is fixed (no longer reproducible)
- [ ] No regressions introduced
- [ ] Tests added to prevent recurrence
- [ ] Documentation updated (if needed)

### Deployment Considerations
- [ ] Database migration needed? [Yes/No]
- [ ] Config change needed? [Yes/No]
- [ ] Feature flag involved? [Yes/No]
- [ ] Canary deployment? [Yes/No]

---

## 7. Prevention

### Process Changes
How to prevent this type of bug in the future:

- [ ] Add test case: `[describe]`
- [ ] Update documentation: `[describe]`
- [ ] Add linting rule: `[describe]`
- [ ] Improve error handling: `[describe]`
- [ ] Add monitoring: `[describe]`

### Technical Debt
Did this bug reveal any technical debt to address?

- [ ] `[Debt description]` - Priority: `[P0/P1/P2/P3]`

---

## 8. Post-Mortem (for significant bugs)

### Timeline
| Time | Event |
|------|-------|
| `[When]` | `[What happened]` |
| `[When]` | `[What happened]` |

### Impact Assessment
- Users affected: `[number or segment]`
- Downtime duration: `[if applicable]`
- Data loss: `[if applicable]`
- Business impact: `[description]`

### Lessons Learned
- What went well?
- What could be improved?
- Action items to prevent recurrence

---

## Debugging Checklist

Use this checklist when investigating bugs:

### Information Gathering
- [ ] Read the bug report carefully
- [ ] Reproduce the bug locally
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Review application logs
- [ ] Check recent commits/changes

### Code Analysis
- [ ] Search for relevant code using grep/ripgrep
- [ ] Check repo-map for related services
- [ ] Review error handling paths
- [ ] Look for race conditions
- [ ] Check for async/await issues

### Testing
- [ ] Write a failing test that reproduces the bug
- [ ] Use debugger to step through code
- [ ] Add logging to trace execution
- [ ] Test with different data sets
- [ ] Test edge cases

### Fix Validation
- [ ] Fix makes the failing test pass
- [ ] No existing tests break
- [ ] Manual verification passes
- [ ] Code review completed
- [ ] Documentation updated

---

## Common Bug Patterns

### Frontend (Next.js/React)

| Pattern | Common Cause | Fix Approach |
|---------|--------------|--------------|
| Component not re-rendering | Missing dependency in `useEffect` | Add missing dependency or use correct hook |
| State not updating | Mutation instead of immutable update | Use spread operator or immer |
| Memory leak | Missing cleanup in `useEffect` | Return cleanup function |
| Hydration mismatch | Server/client render difference | Ensure consistent rendering |

### Backend (Go)

| Pattern | Common Cause | Fix Approach |
|---------|--------------|--------------|
| Nil pointer dereference | Missing nil check | Add nil check before use |
| Race condition | Unprotected shared state | Add mutex or use channels |
| Resource leak | Missing defer close() | Add defer for cleanup |
| Context cancellation | Not checking ctx.Done() | Check context in loops |

### GraphQL

| Pattern | Common Cause | Fix Approach |
|---------|--------------|--------------|
| N+1 query | No dataloader | Implement dataloader |
| Null result | Error in resolver | Check error propagation |
| Invalid response | Type mismatch | Fix schema or resolver return type |

---

## Quick Reference Commands

### Reproduce Bug
```bash
# Run specific test
npm test -- bug.test.ts

# Run E2E test
npx playwright test bug.spec.ts

# Check logs
tail -f logs/app.log | grep ERROR
```

### Debug
```bash
# Run with debugger
node --inspect-brk index.js

# Check recent changes
git log --since="2 days ago" --oneline

# Search for related code
rg "functionName" --type-go --type-ts
```

### Verify Fix
```bash
# Run all tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check

# Build
npm run build
```

---

*Generated from AI Platform bugfix template*
