import { expect, Page } from '@playwright/test';
import { SearchComponent } from '../components/SearchComponent';
import { BasePage } from './BasePage';
import { getSecondsFromMinutes } from '../helpers/getSecondsFromMinutes';

export class PlaylistPage extends BasePage {
  searchComponent: SearchComponent;

  constructor(page: Page) {
    super(page);
    this.searchComponent = new SearchComponent(page);
  }

  async searchTrack(searchQuery: string) {
    await this.searchComponent.enterSearchQuery(searchQuery);
  }

  async verifySearchTracksAreDisplayed(searchQuery: string) {
    await this.searchComponent.getSearchRes(searchQuery);
  }

  async addSigleTrack(trackName: string) {
    await this.page
      .locator(
        `//p[contains(@class, 'MuiTypography') and text() = '${trackName}']/parent::div/following-sibling::button[text()='+']`,
      )
      .click();
  }

  async verifyAddedTrackInYourPlaylist(addedTrackName: string) {
    await expect(
      this.page.locator(
        `//p[contains(@class, 'MuiTypography') and text() = 'Your playlist']/parent::div//p[contains(@class, 'MuiTypography') and text()='${addedTrackName}']`,
      ),
    ).toBeVisible();
  }

  async summarizeTotalTrackDuration() {
    const trackDurations = await this.page
      .locator(
        `//div[@id='playlist']//div[contains(@class, 'MuiGrid-grid-xs-2')]//p[contains(@class, 'MuiTypography-body1')]`,
      )
      .allTextContents();

    let totalSeconds = 0;

    for (const time of trackDurations) {
      totalSeconds += getSecondsFromMinutes(time);
    }

    return totalSeconds;
  }

  async verifyTotalTrackDuration(totalSeconds: number) {
    await expect(this.page.locator(`p[id='playlist-duration']`)).toContainText(
      totalSeconds.toString(),
    );
  }
}
