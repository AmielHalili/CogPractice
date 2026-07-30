// DELETE /bank/admin/users/{username}
import * as bankService from '../../services/bankService.js';
import { success } from '../lib/http.js';
import { withHandler } from '../lib/withHandler.js';

export const handler = withHandler(async (event) => {
  const { username } = event.pathParameters;
  await bankService.removeUser(username);
  return success({ message: `User ${username} deleted successfully.` });
});
