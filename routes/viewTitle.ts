import express from 'express';
import getTitleInfo from '../api/getTitleInfo';

export default function register(router: express.Router) {
  router.get('/titleInfo', (req, res) => {
    const { title } = req.query;
    if (typeof title !== 'string') {
      res.send({ err: 'specify title in \'title\' url parameter' });
      res.end();
      return;
    }
    getTitleInfo(title).then((titleInfo) => {
      res.send(titleInfo);
      res.end();
    });
  });
}
