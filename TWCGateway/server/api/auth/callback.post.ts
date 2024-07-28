import jwt from 'jsonwebtoken';
import fs from 'fs';
import type { User } from '@prisma/client';

export default defineEventHandler(async event => {
  console.log('callback accessed');
  const body = await readBody(event);
  let payload = jwt.verify(
    body.id_token,
    fs.readFileSync(process.cwd() + '/cert-dev.pem')
  );
  console.log('payload', payload);

  let retrievedEmail;
  if (typeof payload === 'object' && 'email' in payload) {
    retrievedEmail = payload.email;
  }

  try {
    const retrievedUser: User | null =
      await event.context.prisma.user.findFirst({
        where: { email: retrievedEmail },
      });
    if (!retrievedUser) {
      setCookie(event, 'token', body.id_token);
      setCookie(event, 'role', 'EMPLOYEE');
      console.error(`${retrievedEmail} not found`);
      const newUser = await event.context.prisma.user.create({
        data: {
          name: 'New User',
          email: retrievedEmail,
        },
      });
      sendRedirect(event, '/employee');
    } else {
      console.log('retrievedUser', retrievedUser);
      setCookie(event, 'token', body.id_token);
      setCookie(event, 'role', retrievedUser.role);
      if (retrievedUser.role === 'ADMIN') {
        sendRedirect(event, '/admin/users');
      } else if (retrievedUser.role === 'SUPERVISOR') {
        sendRedirect(event, '/supervisor');
      } else if (retrievedUser.role === 'EMPLOYEE') {
        sendRedirect(event, '/employee');
      } else {
        console.error('callback.post.ts >> User role not found');
      }
    }
  } catch (error) {
    console.error(error);
  }
});
