import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
// import { torAgent } from "./incapsula";

const { API_ENDPOINT } = process.env;
export const incapsulaToken = null;

// ensure search term is valid so we don't get funky ssrf
const validSearchTerm = /^[a-zA-Z0-9_-]*$/;

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
      const $ = cheerio.load(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}
