import express from 'express';
import searchForTerm from '../api/search';

export default function register(router: express.Router) {
  router.get('/search', (req, res) => {
    const { term } = req.params;
    if (!term) {
      res.send({ err: 'specify search term in \'term\' url parameter' });
      res.end();
      return;
    }
    searchForTerm(term).then((searchResults) => {
      console.log(searchResults);
    });
  });
}
