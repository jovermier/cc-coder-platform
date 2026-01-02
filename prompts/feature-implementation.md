# Feature Implementation Prompt

> This prompt guides AI agents through implementing features based on an architecture plan.

## Context

You are implementing a feature based on an approved architecture plan. Your goal is to write clean, production-ready code that follows the project's existing patterns and conventions.

## Pre-Implementation Checklist

Before writing any code, verify:

- [ ] Architecture plan exists and is approved
- [ ] `.ai/repo-map.yaml` has been reviewed
- [ ] Existing services/utilities have been identified
- [ ] Tests are planned before implementation

## Implementation Workflow

### 1. Understand the Requirements

**Read the architecture plan** and extract:
- Goals and non-goals
- Technical approach
- Data model changes
- API changes
- Testing requirements

**Questions to clarify** (if anything is ambiguous):
- What is the primary user flow?
- What are the edge cases?
- Are there any constraints (performance, security)?
- What existing code should be reused?

### 2. Review Existing Code

**Consult the repo-map** (`/workspace/.ai/repo-map.yaml`):
- Identify relevant services to use
- Find existing utilities to leverage
- Understand patterns to follow
- Locate components to extend

**DO NOT**:
- Create duplicate functionality
- Introduce new patterns without discussion
- Ignore existing conventions

### 3. Plan the Implementation

Break down the work into small, testable steps:

1. Database changes (if any)
2. Backend API changes
3. Frontend component changes
4. Integration wiring
5. Tests

### 4. Implement Step-by-Step

For each step:

#### A. Write the Code
- Follow existing patterns (naming, structure, conventions)
- Keep functions focused and small
- Add comments only for non-obvious logic
- Handle errors appropriately

#### B. Write Tests
- Unit tests for new functions
- Integration tests for API changes
- E2E tests for user flows
- Test edge cases explicitly

#### C. Verify
- Run tests and ensure they pass
- Check for type errors
- Verify no linter warnings
- Manual smoke test if needed

#### D. Commit
- Write clear commit messages
- Keep commits atomic (one logical change each)
- Reference the architecture plan

## Code Quality Standards

### Backend (Go)

```go
// ✅ Good - follows conventions
func (s *UserService) CreateUser(ctx context.Context, req CreateUserRequest) (*User, error) {
    // Validate input
    if err := req.Validate(); err != nil {
        return nil, errors.Wrap(err, "invalid request")
    }

    // Check for existing user
    existing, err := s.repo.FindByEmail(ctx, req.Email)
    if err != nil && !errors.Is(err, ErrNotFound) {
        return nil, errors.Wrap(err, "failed to check existing user")
    }
    if existing != nil {
        return nil, ErrUserAlreadyExists
    }

    // Create user
    user := &User{
        ID:        uuid.New(),
        Email:     req.Email,
        CreatedAt: time.Now(),
    }

    if err := s.repo.Create(ctx, user); err != nil {
        return nil, errors.Wrap(err, "failed to create user")
    }

    return user, nil
}
```

**Follow these patterns**:
- Accept context as first parameter
- Wrap errors with context
- Check for specific error types
- Use existing utilities from `backend/utils/`

### Frontend (Next.js)

```typescript
// ✅ Good - server component by default
async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <UserSettings email={user.email} />
    </div>
  )
}
```

**Follow these patterns**:
- Use Server Components by default
- Only use Client Components when necessary (interactivity)
- Use `Link` for navigation, not `<a>`
- Use `next/image` for images
- Handle loading and error states

### GraphQL

```graphql
# ✅ Good - clear, descriptive types
type User {
  id: ID!
  email: String!
  profile: UserProfile
  createdAt: DateTime!
}

extend type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): UserConnection!
}

extend type Mutation {
  updateUser(input: UpdateUserInput!): User!
}
```

**Follow these patterns**:
- Use descriptive type names
- Include connection types for lists
- Use input types for mutations
- Handle errors in the response

## Testing Standards

### Unit Tests

```go
// ✅ Good - table-driven tests
func TestCreateUser(t *testing.T) {
    tests := []struct {
        name    string
        req     CreateUserRequest
        want    *User
        wantErr error
    }{
        {
            name: "valid user",
            req:  CreateUserRequest{Email: "test@example.com"},
            want: &User{Email: "test@example.com"},
        },
        {
            name:    "duplicate email",
            req:     CreateUserRequest{Email: "existing@example.com"},
            wantErr: ErrUserAlreadyExists,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // Test implementation
        })
    }
}
```

### E2E Tests (Playwright)

```typescript
// ✅ Good - clear test structure
test('user can log in', async ({ page }) => {
  // Arrange
  await page.goto('/login')
  const email = 'test@example.com'

  // Act
  await page.getByLabel('Email').fill(email)
  await page.getByRole('button', { name: 'Log in' }).click()

  // Assert
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText(`Welcome, ${email}`)).toBeVisible()
})
```

## Common Pitfalls to Avoid

| Pitfall | Instead |
|---------|---------|
| Creating a new utility function | Check if one exists in repo-map |
| Using `<a>` for links | Use `next/link` Link component |
| Ignoring errors | Always handle errors appropriately |
| Writing overly complex code | Keep it simple and readable |
| Skipping tests | Write tests as you go |
| Hardcoding values | Use constants or configuration |

## Completion Criteria

The implementation is complete when:

- [ ] All code follows existing patterns
- [ ] All tests pass (unit, integration, E2E)
- [ ] No type errors or linter warnings
- [ ] Manual smoke test passes
- [ ] Code review checklist is complete
- [ ] Documentation is updated

## Code Review Checklist

Before submitting for review:

### Functionality
- [ ] All requirements from architecture plan are met
- [ ] Edge cases are handled
- [ ] Error paths are covered

### Code Quality
- [ ] Code is readable and maintainable
- [ ] No unnecessary complexity
- [ ] Follows project conventions
- [ ] No dead code or commented-out code

### Testing
- [ ] Unit tests cover new code
- [ ] Integration tests cover API changes
- [ ] E2E tests cover user flows
- [ ] Tests are not flaky

### Security
- [ ] Input validation is present
- [ ] Auth/authorization is correct
- [ ] No sensitive data in logs
- [ ] SQL injection prevented
- [ ] XSS prevention in place

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching where needed
- [ ] No memory leaks
- [ ] Reasonable response times

---

*Generated from AI Platform feature-implementation template*
