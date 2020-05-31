import express from 'express';
import searchRegister from './search';

const routerRegistrars = [searchRegister];

const router = express.Router();
routerRegistrars.forEach((registrar) => registrar(router));
export default router;
