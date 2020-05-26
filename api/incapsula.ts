// Funimation uses Incapsula in order to prevent DDoS attacks, caching, and security.
// Requests that do not have the Incapsula cookie will be denied.
// In order to obtain a cookie, Incapsula runs Javascript tests to see what the browser.
// Mirromation starts Puppeteer, a headless browser, to automatically do these tests.

import puppeteer from 'puppeteer';

const API_ENDPOINT = process.env.API_ENDPOINT ? process.env.API_ENDPOINT : '';
let cookies: string = '';

export const getCookies = (): string => cookies;

// starts the puppeteer browser with the tor proxy and starts the cookie fetch loop
export function puppeteerLaunch(): Promise<string> {
  return new Promise((res) => {
    puppeteer.launch().then((browser: puppeteer.Browser) => {
      // fetches the incapsula cookie every 6 minutes and stores it in incapsulaCookie.
      (function getIncapsulaCookieLoop() {
        browser.newPage().then((page: puppeteer.Page) => {
          page.goto(API_ENDPOINT).then(() => {
            page.cookies().then((currentCookies: Array<puppeteer.Cookie>) => {
              cookies = currentCookies.reduce<string>((accumulator, cookie) => `${accumulator}${cookie.name}=${cookie.value}; `, '');
              cookies = cookies.slice(0, -2);
              setTimeout(getIncapsulaCookieLoop, 360000);
              res(cookies);
            });
          });
        });
      }());
    });
  });
}
