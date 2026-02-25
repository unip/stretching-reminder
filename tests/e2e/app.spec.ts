import { test, expect } from '@playwright/test';

test.describe('Stretching Reminder App', () => {
  test('should launch and display app title', async ({ page }) => {
    await page.goto('/');
    
    // Check if app title is visible
    await expect(page.getByRole('heading', { name: /stretching reminder/i })).toBeVisible();
  });

  test('should display start timer button', async ({ page }) => {
    await page.goto('/');
    
    // Check if start timer button is visible
    await expect(page.getByRole('button', { name: /start timer/i })).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/');
    
    // Click settings button
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Check if settings page is visible
    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
  });

  test('should change interval and save settings', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to settings
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Change interval
    const intervalInput = page.getByLabel(/reminder interval/i);
    await intervalInput.clear();
    await intervalInput.fill('15');
    
    // Click save
    await page.getByRole('button', { name: /save changes/i }).click();
    
    // Navigate back to home
    await page.getByRole('button', { name: /back/i }).click();
    
    // Verify interval is updated on home page
    await expect(page.getByText(/15 minutes/i)).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to settings
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Enable dark mode
    const darkModeToggle = page.getByLabel(/dark mode/i);
    await darkModeToggle.click();
    
    // Save settings
    await page.getByRole('button', { name: /save changes/i }).click();
    
    // Check if dark mode is applied
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should start timer when clicking start button', async ({ page }) => {
    await page.goto('/');
    
    // Click start timer
    await page.getByRole('button', { name: /start timer/i }).click();
    
    // Timer display should be visible (countdown timer)
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible();
  });

  test('should persist settings after page reload', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to settings
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Change custom message
    const messageInput = page.getByLabel(/custom reminder message/i);
    await messageInput.clear();
    await messageInput.fill('Test Message');
    
    // Save
    await page.getByRole('button', { name: /save changes/i }).click();
    
    // Reload page
    await page.reload();
    
    // Navigate to settings again
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Verify message persisted
    await expect(page.getByLabel(/custom reminder message/i)).toHaveValue('Test Message');
  });
});
