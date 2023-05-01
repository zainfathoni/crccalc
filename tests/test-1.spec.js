import { test, expect } from "@playwright/test";
import { readFixture, writeFixture } from "../utils/fixtures";

test("scraping", async ({ page }) => {
  const JSONstring = await readFixture("emails.local.json");
  const emails = JSON.parse(JSONstring);

  const hashes = new Map();
  for (const email of emails) {
    const url = `https://crccalc.com/?crc=${email}&method=crc16&datatype=ascii&outtype=0`;
    await page.goto(url);
    const hash = await page
      .locator("css=#crcTable > tbody > :nth-child(2) > :nth-child(2)")
      .textContent();
    hashes.set(email, hash);
  }

  await writeFixture(`hashes.local.json`, Object.fromEntries(hashes));
});
