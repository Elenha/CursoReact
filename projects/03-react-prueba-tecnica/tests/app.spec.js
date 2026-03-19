import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/';
const CAT_PREFIX_IMG_URL = 'https://cataas.com/cat/';

test('app shows random fact and image', async ({ page }) => {
    // A que ruta tiene que ir!!! // 'page' viene de Playwright
    await page.goto(LOCALHOST_URL);

    // Como es algo pequeño, vamos a recuperar los elementos con el page
    const text = page.locator('p');
    const image = page.locator('img');

    const textContent = await text.textContent();
    const imageSrc = await image.getAttribute('src');

    console.log({ textContent, imageSrc });

    expect(textContent?.length).toBeGreaterThan(0);
    expect(imageSrc?.startsWith(CAT_PREFIX_IMG_URL)).toBeTruthy();

});
