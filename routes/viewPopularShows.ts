import express from 'express';
import getPopularShows from '../api/getPopularShows';

export default function register(router: express.Router) {
  router.get('/popular', (req, res) => {
    const { page } = req.query;
    if (typeof page !== 'string') {
      res.send({ err: 'specify title in \'page\' url parameter' });
      res.end();
      return;
    }
    const numPage = +page;
    if (!numPage) {
      res.send({ err: 'page must be num' });
      res.end();
    }
    getPopularShows(numPage).then((titles) => {
      res.send(titles);
      res.end();
    });
  });
}
