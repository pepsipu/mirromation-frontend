import express from 'express';
import getEpisodeStreamingInfo from '../api/episodeStreamingInfo';

export default function register(router: express.Router) {
  router.get('/stream', (req, res) => {
    const { episodeId } = req.query;
    if (typeof episodeId !== 'string') {
      res.send({ err: 'specify title in \'episodeId\' url parameter' });
      res.end();
      return;
    }
    getEpisodeStreamingInfo(episodeId).then((streamInfo) => {
      res.send(streamInfo);
      res.end();
    });
  });
}
