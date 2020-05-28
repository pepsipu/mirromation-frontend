import axios from 'axios';
import cheerio from 'cheerio';
import { getCookies } from './incapsula';

const { API_ENDPOINT } = process.env;
export const incapsulaToken = null;

// ensure search term is valid so we don't get funky ssrf

export default function searchForTerm(term: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    axios.get(`${API_ENDPOINT}/pred-search/${encodeURIComponent(term)}`, {
      headers: {
        Cookie: getCookies(),
      },
    }).then((res) => {
      const searchResultDocument: CheerioStatic = cheerio.load(res.data);
      const searchTermRequestsPromises = searchResultDocument('ul').children().map((_, { firstChild }) => {
        if (firstChild.firstChild.data && firstChild.firstChild.data.includes('Show')) {
          return axios.get(`${API_ENDPOINT}${firstChild.attribs.href}`, {
            headers: {
              Cookie: getCookies(),
            },
          });
        }
        return null;
      }).get();
      Promise.all(searchTermRequestsPromises).then((searchTermRequests) => {
        resolve(searchTermRequests.map((requestData) => {
          const searchItemDocument: CheerioStatic = cheerio.load(requestData.data);
          const logo = searchItemDocument('.show-detail-logo').first();
          const stars = searchItemDocument('.stars').first();
          const backgroundVideo: Cheerio = searchItemDocument('#main').find('.background-video');
          let image: string;
          if (backgroundVideo.length) {
            const video: string | undefined = backgroundVideo
              .first()
              .find('.player')
              .first()
              .attr('src');
            if (!video) return {};
            // @ts-ignore since we don't need to check if uri is properly made since it always is
            image = video
              .split('&p=')
              .pop()
              .split('&qid')
              .shift();
          } else {
            const imageElement = searchItemDocument('.show-detail-section')
              .parent()
              .children('img')
              .first();
            if (!imageElement) return {};
            // @ts-ignore data-src will always be available
            image = imageElement.attr('data-src');
          }
          return {
            logoSrc: logo.attr('data-src'),
            name: logo.attr('title'),
            rating: stars.attr('data-rating'),
            image,
          };
        }));
      });
    }).catch((err) => {
      reject(err);
    });
  });
}
