// POST /bank/login
import * as bankService from '../../services/bankService.js';
import { parseBody, success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username, password } = parseBody(event);
  await bankService.authenticateUser(username, password);
  return success({
    message: 'Login successful',
    role: username === 'admin' ? 'admin' : 'customer',
  });
}, { errorStatus: 401 });
