import express, { NextFunction, Request, Response } from 'express';
import { ApiError, createApiResponse } from '../services/model';
import * as BraintreeService from '../services/braintree';

const router = express.Router();

router.post('/topup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await BraintreeService.topUp(req.body?.amount);
    return res.status(200).send(createApiResponse<any>(null, transaction));
  } catch (err) {
    return next(err);
  }
});

router.get('/history/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stream = BraintreeService.searchHistory();

    let transactions = [];
    stream.on("data", (transaction) => {
        transactions.push(transaction);
    });
    stream.on("end", () => {
        return res.status(200).send(createApiResponse<any>(null, {
          rows: transactions,
          totalCount: transactions.length,
          totalApproved: transactions.length == 0 ? 0 :
                          transactions.filter(t => t.processorResponseText == "Approved")
                            .map(t => parseFloat(t.amount))
                            .reduce((x, y) => x + y, 0)
      }));
    });
    stream.on("error", (err) => {
        console.error(err);
        throw new ApiError('Failed to get Braintree history');
    });
    stream.resume();
  } catch (err) {
    return next(err);
  }
});

export default router;