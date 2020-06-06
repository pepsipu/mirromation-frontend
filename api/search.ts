import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
import config from '../config/config.json';

const { apiEndpoint } = config;

export default function searchForTerm(term: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/search`, {
      params: {
        q: term,
        cat: 'shows',
        categoryType: 'Series',
      },
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const searchResultDocument: CheerioStatic = cheerio.load(res.data);
      const titles = searchResultDocument('.show-title');
      if (!titles.first().attr('href')) {
        resolve({});
        return;
      }
      resolve(titles.map((_, title) => {
        const link = title.attribs.href;
        return {
          name: title.firstChild.data,
          rawName: link.substring(7, link.indexOf('/', 7)),
        };
      }).get());
    }).catch((err) => {
      reject(err);
    });
  });
}
