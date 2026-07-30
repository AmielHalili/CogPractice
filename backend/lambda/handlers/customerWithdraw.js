// POST /bank/customer/{username}/withdraw
import * as bankService from '../../services/bankService.js';
import { parseBody, success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username } = event.pathParameters;
  const { amount } = parseBody(event);
  const newBalance = await bankService.executeWithdrawal(username, amount);
  return success({ message: `Withdrew $${amount}`, newBalance });
});
