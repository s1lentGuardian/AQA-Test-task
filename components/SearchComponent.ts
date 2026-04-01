import { Page, expect } from '@playwright/test';

export class SearchComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterSearchQuery(searchQuery: string) {
    await this.page
      .locator("//input[contains(@class, 'MuiInputBase') and @type='text']")
      .fill(searchQuery);
  }

  async getSearchRes(searchQuery: string) {
    await expect(
      this.page.locator(`//p[contains(@class, 'MuiTypography') and text()='${searchQuery}']`),
    ).toBeVisible();
  }
}
