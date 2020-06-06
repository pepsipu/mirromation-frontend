import express from 'express';
import searchRegister from './search';
import getTitleRegister from './viewTitle';
import getEpisodesRegister from './viewEpisodes';
import streamEpisodeRegister from './streamEpisode';
import getPopularShows from './viewPopularShows';

const routerRegistrars = [
  searchRegister,
  getTitleRegister,
  getEpisodesRegister,
  streamEpisodeRegister,
  getPopularShows,
];

const router = express.Router();
routerRegistrars.forEach((registrar) => registrar(router));
export default router;
