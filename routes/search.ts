import express from 'express';
import searchForTerm from '../api/search';

export default function register(router: express.Router) {
  router.get('/search', (req, res) => {
    const { term } = req.query;
    if (typeof term !== 'string') {
      res.send({ err: 'specify search term in \'term\' url parameter' });
      res.end();
      return;
    }
    searchForTerm(term).then((searchResults) => {
      res.send(searchResults);
      res.end();
    });
  });
}
