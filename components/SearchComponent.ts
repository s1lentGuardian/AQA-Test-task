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
    const searchedTracks = await this.page
      .locator(`//div[contains(@class, 'MuiGrid-grid-xs-4 ')]/p[contains(@class, 'css-3ffyn9')]`)
      .allTextContents();

    searchedTracks.forEach((track) => {
      expect(track).toContain(searchQuery);
    });
  }
}
