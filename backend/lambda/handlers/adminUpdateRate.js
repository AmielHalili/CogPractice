// PUT /bank/admin/users/{username}/rate
import * as bankService from '../../services/bankService.js';
import { parseBody, success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username } = event.pathParameters;
  const { newRate } = parseBody(event);
  await bankService.updateInterestRate(username, newRate);
  return success({ message: `Interest rate for ${username} updated to ${newRate}.` });
});
