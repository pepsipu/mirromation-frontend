import express from 'express';
import searchRegister from './search';
import getTitleRegister from './viewTitle';
import getEpisodesRegister from './viewEpisodes';
import streamEpisodeRegister from './streamEpisode';

const routerRegistrars = [
  searchRegister,
  getTitleRegister,
  getEpisodesRegister,
  streamEpisodeRegister,
];

const router = express.Router();
routerRegistrars.forEach((registrar) => registrar(router));
export default router;
