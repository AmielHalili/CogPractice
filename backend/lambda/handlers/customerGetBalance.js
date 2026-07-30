// GET /bank/customer/{username}/balance
import * as bankService from '../../services/bankService.js';
import { success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username } = event.pathParameters;
  const data = await bankService.getAccountDetails(username);
  return success({ data });
}, { errorStatus: 404 });
