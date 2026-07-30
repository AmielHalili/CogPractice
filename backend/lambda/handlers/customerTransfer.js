// POST /bank/customer/{username}/transfer
import * as bankService from '../../services/bankService.js';
import { parseBody, success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username } = event.pathParameters;
  const { targetUsername, amount } = parseBody(event);
  const newBalance = await bankService.executeTransfer(username, targetUsername, amount);
  return success({ message: `Transferred $${amount} to ${targetUsername}`, newBalance });
});
