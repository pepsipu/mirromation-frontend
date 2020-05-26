// Funimation uses Incapsula in order to prevent DDoS attacks, caching, and security.
// Requests that do not have the Incapsula cookie will be denied.
// In order to obtain a cookie, Incapsula runs Javascript tests to see what the browser.
// Mirromation starts Puppeteer, a headless browser, to automatically do these tests.

import { SocksProxyAgent } from 'socks-proxy-agent';
import puppeteer from 'puppeteer';

const socksProxy = 'socks5h://localhost:9050';
export const torAgent: SocksProxyAgent = new SocksProxyAgent(socksProxy);
let incapsulaCookie: string = '';

export const getIncapsulaCookie = () : string => incapsulaCookie;

// starts the puppeteer browser with the tor proxy and starts the cookie fetch loop
export function puppeteerLaunch(): void {
  puppeteer.launch({
    args: [
      `--proxy-server=${socksProxy}`,
    ],
  }).then((browser: puppeteer.Browser) => {
    // fetches the incapsula cookie every 6 minutes and stores it in incapsulaCookie.
    (function getIncapsulaCookieLoop() {
      browser.newPage().then((page: puppeteer.Page) => {
        page.goto('https://funimation.com').then(() => {
          page.cookies().then((cookies: Array<puppeteer.Cookie>) => {
            const possibleCookie: puppeteer.Cookie | undefined = cookies.find((cookie) => cookie.name.startsWith('incap_ses'));
            incapsulaCookie = possibleCookie ? possibleCookie.value : '';
            setTimeout(getIncapsulaCookieLoop, 360000);
          });
        });
      });
    }());
  });
}
