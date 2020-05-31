// Funimation uses Incapsula in order to prevent DDoS attacks, caching, and security.
// Requests that do not have the Incapsula cookie will be denied.
// In order to obtain a cookie, Incapsula runs Javascript tests to see what the browser.
// Mirromation starts Puppeteer, a headless browser, to automatically do these tests.

import puppeteer from 'puppeteer';
import config from '../config/config.json';

const { apiEndpoint, userAgent } = config;

let cookies: string = '';

export const getCookies = (): string => cookies;

// starts the puppeteer browser and starts the cookie fetch loop
export function puppeteerLaunch(): Promise<string> {
  return new Promise((resolve, reject) => {
    puppeteer.launch({
      headless: process.env.HEADLESS === 'true',
    }).then((browser: puppeteer.Browser) => {
      // fetches the incapsula cookie every 6 minutes and stores it in incapsulaCookie.
      (async function getIncapsulaCookieLoop(): Promise<void> {
        const page = (await browser.pages()).pop();
        if (!page) {
          reject(new Error('Could not get page.'));
          return;
        }
        await page.setUserAgent(userAgent);
        try {
          await page.goto(apiEndpoint).catch((error) => {
            reject(error);
            throw error;
          });
        } catch (e) {
          return;
        }
        const currentCookies: Array<puppeteer.Cookie> = await page.cookies();
        cookies = currentCookies.reduce<string>((accumulator, cookie) => `${accumulator}${cookie.name}=${cookie.value}; `, '');
        cookies = cookies.slice(0, -2);
        setTimeout(getIncapsulaCookieLoop, 360000 + Math.floor(Math.random() * 20000));
      }()).then(() => {
        resolve(cookies);
      });
    });
  });
}
