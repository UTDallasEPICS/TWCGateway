FROM --platform=linux/arm64 node:alpine
COPY ./backend/package.json ./backend/.env ./backend/index.js ./backend/router.js ./backend/server ./backend/prisma/schema.prisma ./backend/prisma/seed.js ./backend/node_modules /
EXPOSE 5001
CMD ["npm run dev"]