import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
import config from '../config/config.json';
import {raw} from "express";

const { apiEndpoint } = config;

export default function getPopularShows(page: number): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/shows/popular/`, {
      params: {
        sort: 'popularity',
        p: page,
      },
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const popularShowsDocument: CheerioStatic = cheerio.load(res.data);
      const showElements = popularShowsDocument('.show-wrapper');
      resolve(showElements.map((_, showElement) => {
        const name: string = showElement.children[3].children[1].children[0].data || '';
        const url = showElement.children[1].attribs.href;
        return {
          name,
          rawName: url.substring(7, url.indexOf('/', 7)),
          media: showElement.children[1].children[1].attribs['data-src'],
        };
      }).get());
    }).catch((err) => {
      reject(err);
    });
  });
}
