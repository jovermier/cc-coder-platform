import { Page, Locator } from '@playwright/test'

/**
 * Navigation helpers for Playwright tests
 */

/**
 * Waits for navigation to complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle')
}

/**
 * Navigates to a URL and waits for page load
 */
export async function gotoAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url)
  await waitForNavigation(page)
}

/**
 * Clicks an element and waits for navigation
 */
export async function clickAndWait(page: Page, selector: string | Locator): Promise<void> {
  const element = typeof selector === 'string' ? page.locator(selector) : selector
  await Promise.all([
    page.waitForLoadState('networkidle'),
    element.click(),
  ])
}

/**
 * Fills a form and submits
 */
export async function fillForm(
  page: Page,
  fields: Record<string, string>,
  submitSelector: string = '[type="submit"]'
): Promise<void> {
  for (const [field, value] of Object.entries(fields)) {
    await page.getByTestId(field).fill(value)
  }
  await page.locator(submitSelector).click()
}

/**
 * Checks for toast/notification messages
 */
export async function getToastMessage(page: Page): Promise<string | null> {
  const toast = page.getByTestId(/toast|notification|message/).first()
  if (await toast.isVisible()) {
    return await toast.textContent()
  }
  return null
}

/**
 * Waits for toast to disappear
 */
export async function waitForToastToDisappear(page: Page): Promise<void> {
  const toast = page.getByTestId(/toast|notification|message/).first()
  await toast.waitFor({ state: 'hidden' }).catch(() => {})
}

/**
 * Checks if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector)
  const isVisible = await element.isVisible()
  if (!isVisible) return false

  const box = await element.boundingBox()
  if (!box) return false

  const viewportSize = page.viewportSize()
  if (!viewportSize) return false

  return (
    box.y >= 0 &&
    box.x >= 0 &&
    box.y + box.height <= viewportSize.height &&
    box.x + box.width <= viewportSize.width
  )
}

/**
 * Scrolls element into view
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded()
}

/**
 * Gets text content of multiple elements
 */
export async function getTextContents(
  page: Page,
  selector: string
): Promise<string[]> {
  const elements = page.locator(selector)
  const count = await elements.count()
  const texts: string[] = []

  for (let i = 0; i < count; i++) {
    texts.push(await elements.nth(i).textContent() || '')
  }

  return texts
}

/**
 * Waits for element to be stable (not moving/animating)
 */
export async function waitForStable(
  page: Page,
  selector: string,
  timeout: number = 1000
): Promise<void> {
  const element = page.locator(selector)
  await element.waitFor({ state: 'attached' })

  const boundingBox = await element.boundingBox()
  if (!boundingBox) return

  await page.waitForTimeout(100) // Wait for any animations to start

  // Check if element position stabilizes
  let stableCount = 0
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    const newBox = await element.boundingBox()
    if (newBox && JSON.stringify(newBox) === JSON.stringify(boundingBox)) {
      stableCount++
      if (stableCount >= 3) break
    } else {
      stableCount = 0
    }
    await page.waitForTimeout(50)
  }
}

/**
 * Takes a screenshot with timestamp
 */
export async function takeScreenshot(
  page: Page,
  name: string
): Promise<Buffer> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  return await page.screenshot({
    path: `screenshots/${name}_${timestamp}.png`,
    fullPage: true,
  })
}

/**
 * Selects option from dropdown by text
 */
export async function selectOption(
  page: Page,
  selector: string,
  optionText: string
): Promise<void> {
  await page.locator(selector).selectOption({ label: optionText })
}

/**
 * Uploads a file
 */
export async function uploadFile(
  page: Page,
  selector: string,
  filePath: string
): Promise<void> {
  const fileInput = page.locator(selector)
  await fileInput.setInputFiles(filePath)
}

/**
 * Hovers over element
 */
export async function hover(page: Page, selector: string): Promise<void> {
  await page.locator(selector).hover()
}

/**
 * Right-clicks on element
 */
export async function rightClick(page: Page, selector: string): Promise<void> {
  await page.locator(selector).click({ button: 'right' })
}

/**
 * Double-clicks on element
 */
export async function doubleClick(page: Page, selector: string): Promise<void> {
  await page.locator(selector).dblclick()
}

/**
 * Presses key combination
 */
export async function pressKeys(page: Page, keys: string[]): Promise<void> {
  for (const key of keys) {
    await page.keyboard.press(key)
  }
}

/**
 * Types text with delay (simulating human typing)
 */
export async function typeSlowly(
  page: Page,
  selector: string,
  text: string,
  delay: number = 50
): Promise<void> {
  const element = page.locator(selector)
  await element.click()
  for (const char of text) {
    await page.keyboard.type(char)
    await page.waitForTimeout(delay)
  }
}

/**
 * Gets all attributes of an element
 */
export async function getAttributes(
  page: Page,
  selector: string
): Promise<Record<string, string>> {
  const element = page.locator(selector).first()
  return await element.evaluate((el) => {
    const attrs: Record<string, string> = {}
    for (const attr of el.attributes) {
      attrs[attr.name] = attr.value
    }
    return attrs
  })
}
