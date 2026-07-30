// POST /bank/admin/users
import * as bankService from '../../services/bankService.js';
import { parseBody, success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username, password, initialBalance, accountType } = parseBody(event);
  await bankService.createNewUser(username, password, initialBalance, accountType);
  return success({ message: `User ${username} added successfully.` }, 201);
});
