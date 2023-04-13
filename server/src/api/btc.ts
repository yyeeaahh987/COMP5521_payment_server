import express, { NextFunction, Request, Response } from 'express';
import { ApiError, createApiResponse } from '../services/model';
import * as BtcService from '../services/btc';

const router = express.Router();

router.get('/total/get', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await BtcService.getTotal();
    return res.status(200).send(createApiResponse<any>(null, total));
  } catch (err) {
    return next(err);
  }
});

export default router;