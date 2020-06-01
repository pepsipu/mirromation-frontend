import express from 'express';
import getEpisodesFromTitleId from '../api/getEpisodes';

export default function register(router: express.Router) {
  router.get('/episodes', (req, res) => {
    const { titleId } = req.query;
    if (typeof titleId !== 'string') {
      res.send({ err: 'specify title in \'title\' url parameter' });
      res.end();
      return;
    }
    getEpisodesFromTitleId(titleId).then((episodes) => {
      res.send(episodes);
      res.end();
    });
  });
}
