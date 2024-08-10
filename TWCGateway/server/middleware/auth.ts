import { loginRedirectUrl, logoutRedirectUrl } from '../api/auth/auth0';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import fs from 'fs';

// const runtime = useRuntimeConfig();
const prismaClient = new PrismaClient();

function checkRestrictedRoute(event: any, userRole: string | undefined) {
  if (event.node.req.url?.includes('/admin') && userRole !== 'ADMIN') {
    if (userRole === 'EMPLOYEE') {
      sendRedirect(event, '/employee');
    } else if (userRole === 'SUPERVISOR') {
      sendRedirect(event, '/supervisor');
    } else {
      console.error(
        'middleware/auth.ts >> checkRestrictedRoute ADMIN conditional branch errored out'
      );
    }
  } else if (
    event.node.req.url?.includes('/supervisor') &&
    userRole !== 'SUPERVISOR'
  ) {
    if (userRole === 'EMPLOYEE') {
      sendRedirect(event, '/employee');
    } else if (userRole === 'ADMIN') {
      sendRedirect(event, '/admin/users');
    } else {
      console.error(
        'middleware/auth.ts >> checkRestrictedRoute SUPERVISOR conditional branch errored out'
      );
    }
  } else if (
    event.node.req.url?.includes('/employee') &&
    userRole !== 'EMPLOYEE'
  ) {
    if (userRole === 'ADMIN') {
      sendRedirect(event, '/admin/users');
    } else if (userRole === 'SUPERVISOR') {
      sendRedirect(event, '/supervisor');
    } else {
      console.error(
        'middleware/auth.ts >> checkRestrictedRoute EMPLOYEE conditional branch errored out'
      );
    }
  }
}

export default defineEventHandler(async event => {
  event.context.prisma = prismaClient;
  const token = getCookie(event, 'token') || '';
  console.log('--------------------');
  console.log('Curr URL: ', event.node.req.url);
  console.log('Status of !token: ', !token);
  console.log(
    "Status of !event.node.req.url?.includes('/api/auth/callback'): ",
    !event.node.req.url?.includes('/api/auth/callback')
  );
  // const role = getCookie(event, 'role') || '';
  if (!token && !event.node.req.url?.includes('/api/auth/callback')) {
    await sendRedirect(event, loginRedirectUrl());
  } else {
    if (token) {
      console.log('got it before logout.get.ts');
      console.log('--------------------');

      try {
        const claims = jwt.verify(
          token,
          fs.readFileSync(process.cwd() + '/cert-dev.pem')
        );
        event.context.claims = claims;
        const userRole: string | undefined = getCookie(event, 'role');
        checkRestrictedRoute(event, userRole);
      } catch (e) {
        console.error(e);
        setCookie(event, 'token', '');
        await sendRedirect(event, logoutRedirectUrl(token as string) || '');
      }
    } else {
      console.log('token not found');
      console.log('--------------------');
    }
  }
});
