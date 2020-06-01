import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';
import config from '../config/config.json';

const { apiEndpoint } = config;

export default function getTitleInfo(rawTitle: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/shows/${encodeURIComponent(rawTitle)}`, {
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const titleDocument: CheerioStatic = cheerio.load(res.data);
      const logo = titleDocument('.show-detail-logo').first();
      const stars = titleDocument('.stars').first();
      const main: Cheerio = titleDocument('#main');
      const backgroundVideo: Cheerio = main.find('.background-video');
      let media: string;
      if (backgroundVideo.length) {
        const video: string | undefined = backgroundVideo
          .first()
          .find('.player')
          .first()
          .attr('src');
        if (!video) return;
        media = video;
      } else {
        const imageElement = titleDocument('.show-detail-section')
          .parent()
          .children('img')
          .first();
        if (!imageElement) return;
        // @ts-ignore data-src will always be available
        media = imageElement.attr('data-src');
      }
      resolve({
        logoSrc: logo.attr('data-src'),
        name: logo.attr('title'),
        rating: stars.attr('data-rating'),
        about: titleDocument('.aboutSynopsis').first().text(),
        id: main.children().first().attr('data-id'),
        media,
      });
    }).catch((err) => {
      reject(err);
    });
  });
}
