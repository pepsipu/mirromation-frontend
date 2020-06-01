import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
import config from '../config/config.json';

const { apiEndpoint } = config;

export default function searchForTerm(term: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/pred-search/${encodeURIComponent(term)}`, {
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const searchResultDocument: CheerioStatic = cheerio.load(res.data);
      const preSearchResults = searchResultDocument('ul').children().map((_, { firstChild }) => {
        const title = firstChild.firstChild.data;
        if (title && title.includes('Show')) {
          const splitUrl = firstChild.attribs.href.split('/');
          const rawName = splitUrl[splitUrl.length - 2];
          return {
            rawName,
            name: title.slice(0, -8),
          };
        }
        return null;
      }).get();
      resolve(preSearchResults);
    }).catch((err) => {
      reject(err);
    });
  });
}
