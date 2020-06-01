import express from 'express';
import searchRegister from './search';
import getTitleRegister from './viewTitle';
import getEpisodesRegister from './viewEpisodes';

const routerRegistrars = [searchRegister, getTitleRegister, getEpisodesRegister];

const router = express.Router();
routerRegistrars.forEach((registrar) => registrar(router));
export default router;
