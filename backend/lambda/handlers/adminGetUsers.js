// GET /bank/admin/users
import * as bankService from '../../services/bankService.js';
import { success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async () => {
  const users = await bankService.getAllUsernames();
  return success({ users });
}, { errorStatus: 500 });
