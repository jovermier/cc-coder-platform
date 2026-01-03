import { Page, test } from '@playwright/test'

/**
 * Authentication helpers for Playwright tests
 */

export interface AuthUser {
  username: string
  password: string
  email?: string
  name?: string
}

/**
 * Creates a test user for authentication
 */
export async function createTestUser(overrides: Partial<AuthUser> = {}): Promise<AuthUser> {
  return {
    username: `testuser_${Date.now()}`,
    password: 'TestPassword123!',
    email: `test_${Date.now()}@example.com`,
    name: 'Test User',
    ...overrides,
  }
}

/**
 * Authenticates a user through the login flow
 */
export async function loginUser(page: Page, user: AuthUser): Promise<void> {
  await page.goto('/login')

  await page.getByTestId('email-input').fill(user.email || user.username)
  await page.getByTestId('password-input').fill(user.password)
  await page.getByTestId('submit-button').click()

  // Wait for navigation to dashboard or home
  await page.waitForURL('**/dashboard', { timeout: 5000 }).catch(() => {
    // If not dashboard, check for successful login indicator
    return page.getByTestId('user-menu').waitFor()
  })
}

/**
 * Logs out the current user
 */
export async function logoutUser(page: Page): Promise<void> {
  await page.getByTestId('logout-button').click()
  await page.waitForURL('**/login')
}

/**
 * Creates an authenticated page fixture
 */
export const testWithAuth = test.extend<{
  authenticatedPage: Page
  testUser: AuthUser
}>({
  testUser: async ({}, use) => {
    const user = await createTestUser()
    await use(user)
    // Cleanup: delete test user if needed
  },

  authenticatedPage: async ({ page, testUser }, use) => {
    await loginUser(page, testUser)
    await use(page)
  },
})

/**
 * Preserves auth state across tests
 */
export async function saveAuthState(page: Page, path: string): Promise<void> {
  await page.context().storageState({ path })
}

/**
 * Loads auth state from file
 * Uses Playwright's storageState API to load cookies and localStorage
 * @see https://playwright.dev/docs/auth
 */
export async function loadAuthState(page: Page, path: string): Promise<void> {
  try {
    // Load the storage state from file
    await page.context().storageState({ path })
  } catch {
    // If file doesn't exist, just clear storage
    await page.context().addInitScript(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  }
}
