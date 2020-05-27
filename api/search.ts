import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
// import { torAgent } from "./incapsula";

const { API_ENDPOINT } = process.env;
export const incapsulaToken = null;

// ensure search term is valid so we don't get funky ssrf
const validSearchTerm: RegExp = /^[a-zA-Z0-9_-]*$/;

export default function searchForTerm(term: string) {
  return new Promise((resolve, reject) => {
    if (!validSearchTerm.test(term)) {
      reject(new Error('Unsafe search term.'));
      return;
    }
    axios.get(`${API_ENDPOINT}/pred-search/${term}`, {
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const $: CheerioStatic = cheerio.load(res.data);
      resolve($('ul').children().map((_, { firstChild }) => ({
        link: firstChild.attribs.href,
        title: firstChild.firstChild.data,
      })).get());
    }).catch((err) => {
      reject(err);
    });
  });
}
