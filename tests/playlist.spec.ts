import { test } from '@playwright/test';
import { PlaylistPage } from '../pages/PlaylistPage';

test.describe('Playlist page', () => {
  test.beforeEach(async ({ page }) => {
    const playlistPage = new PlaylistPage(page);
    await playlistPage.navigateTo('https://vite-react-alpha-lemon.vercel.app/');
  });

  test('Successful track searching using valid track name', async ({ page }) => {
    const playlistPage = new PlaylistPage(page);
    const trackName = 'Summer Breeze';

    await playlistPage.searchTrack(trackName);
    await playlistPage.verifySearchTracksAreDisplayed(trackName);
  });

  test("Successful adding existing track to the 'YOUR PLAYLIST' section", async ({ page }) => {
    const playlistPage = new PlaylistPage(page);
    const trackName = 'Summer Breeze';

    await playlistPage.addSigleTrack(trackName);
    await playlistPage.verifyAddedTrackInYourPlaylist(trackName);
  });

  test("Total tracks duration equals to the sum duration of the added tracks in the 'YOUR PLAYLIST' section", async ({
    page,
  }) => {
    const playlistPage = new PlaylistPage(page);
    let trackNames = ['Summer Breeze', 'Autumn Leaves'];

    await playlistPage.addSigleTrack(trackNames[0]);
    await playlistPage.addSigleTrack(trackNames[1]);

    const totalSeconds = await playlistPage.summarizeTotalTrackDuration();
    await playlistPage.verifyTotalTrackDuration(totalSeconds);
  });
});
