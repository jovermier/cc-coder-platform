# Architecture Plan Template

> Use this template to create detailed architecture plans before implementing features. This ensures AI agents have complete context and reduces the need for rework.

## Metadata

```yaml
Feature Name:        [Brief feature name]
Author:              [Who is planning this]
Date:                [YYYY-MM-DD]
Status:              [Draft | Review | Approved]
Priority:            [P0 | P1 | P2 | P3]
Estimated Effort:   [e.g., 2-3 days]
Related Issues:      [Link to GitHub issues]
```

---

## 1. Goals and Non-Goals

### Goals
What this feature will deliver:

- [Goal 1] - Clear, measurable outcome
- [Goal 2] - Clear, measurable outcome
- [Goal 3] - Clear, measurable outcome

### Non-Goals
Explicitly state what is OUT OF SCOPE:

- [Not doing X] - Reason why
- [Not doing Y] - Reason why
- [Not doing Z] - Reason why

---

## 2. Context and Problem Statement

### Problem
What problem are we solving? Why now?

### Current State
How does the system work currently?

### Desired State
How will it work after this feature?

---

## 3. Requirements

### Functional Requirements
What the feature must do:

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR1 | [Description] | [How to verify it works] |
| FR2 | [Description] | [How to verify it works] |

### Non-Functional Requirements
Quality attributes:

| ID | Requirement | Target |
|----|-------------|--------|
| NFR1 | Performance | Response time < 200ms |
| NFR2 | Security | Authenticated access only |
| NFR3 | Scalability | Support 10k concurrent users |

---

## 4. Technical Approach

### Architecture Overview
```mermaid
[Insert diagram or describe the architecture]
```

### Components
List all components involved:

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| [Name] | [What it does] | [Tech stack] |
| [Name] | [What it does] | [Tech stack] |

### Data Model Changes

#### New Tables/Entities
```sql
-- Example DDL
CREATE TABLE example_table (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Schema Changes
- [ ] New table: `[name]`
- [ ] Modify table: `[table]` - Add column `[column]`
- [ ] Migration required: `[file]`

### API Changes

#### GraphQL
```graphql
# New types
type NewType {
  id: ID!
  field: String!
}

# New queries/mutations
extend type Query {
  newQuery(id: ID!): NewType
}

extend type Mutation {
  newMutation(input: NewInput!): NewType!
}
```

#### REST (if applicable)
- `GET /endpoint` - Description
- `POST /endpoint` - Description

---

## 5. Implementation Plan

### Step-by-Step Breakdown

| Step | Task | Owner | Estimate | Dependencies |
|------|------|-------|----------|--------------|
| 1 | [Database migration] | [Who] | [Time] | [What must be done first] |
| 2 | [Backend API] | [Who] | [Time] | Step 1 |
| 3 | [Frontend UI] | [Who] | [Time] | Step 2 |
| 4 | [Tests] | [Who] | [Time] | Step 3 |
| 5 | [Documentation] | [Who] | [Time] | Step 4 |

### Risk Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| [What could go wrong] | [High/Med/Low] | [How to prevent/fix] |

---

## 6. Testing Strategy

### Unit Tests
- [ ] Backend services: `[test files]`
- [ ] Frontend components: `[test files]`

### Integration Tests
- [ ] API endpoints: `[test files]`
- [ ] Database operations: `[test files]`

### E2E Tests (Playwright)
- [ ] User flow: `[test spec]`
- [ ] Edge cases: `[test spec]`

### Test Data
- Seed script: `[location]`
- Test accounts: `[describe]`

---

## 7. Edge Cases and Error Handling

### Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| [Edge case 1] | [What should happen] |
| [Edge case 2] | [What should happen] |

### Error Handling
| Error | Handling Strategy |
|-------|-------------------|
| [Error type] | [How to handle/notify user] |

---

## 8. Security Considerations

- [ ] Authentication: `[describe]`
- [ ] Authorization: `[describe]`
- [ ] Input validation: `[describe]`
- [ ] Output encoding: `[describe]`
- [ ] Rate limiting: `[describe]`

---

## 9. Rollout Plan

### Deployment Strategy
- [ ] Feature flag: `[flag name]`
- [ ] Canary deployment: `[percentage]`
- [ ] A/B testing: `[describe]`

### Migration Path
- [ ] Data migration: `[script]`
- [ ] Backward compatibility: `[describe]`
- [ ] Deprecation timeline: `[date]`

---

## 10. Monitoring and Observability

### Metrics to Track
| Metric | Why | Alert Threshold |
|--------|-----|-----------------|
| [Metric name] | [What it indicates] | [When to alert] |

### Logging
- Key events to log: `[list]`
- Log level: `[DEBUG|INFO|WARN|ERROR]`

### Dashboards
- Dashboard URL: `[link]`

---

## 11. Existing Code References

### Services to Use (from repo-map)
- `auth` - `backend/auth/` - For authentication
- `errors` - `backend/utils/errors.go` - For error handling

### Patterns to Follow
- Service layer pattern: `backend/services/`
- Component structure: `frontend/components/`

### DO NOT Reimplement
- [Existing utility]: `[location]` - Use this instead
- [Existing pattern]: `[location]` - Follow this pattern

---

## 12. Open Questions

| Question | Proposed Answer | Decision |
|----------|-----------------|----------|
| [What needs clarification?] | [Suggested answer] | [Decided/TBD] |

---

## 13. Appendix

### References
- [Design doc/ADR] - `[link]`
- [Similar feature] - `[link]`
- [Documentation] - `[link]`

### Terminology
| Term | Definition |
|------|------------|
| [Term] | [What it means in this context] |

---

## Approval

| Role | Name | Approval |
|------|------|-----------|
| Tech Lead | | [ ] Approved |
| Product | | [ ] Approved |
| Security | | [ ] Approved |

---

*Generated from AI Platform architecture-plan template*
