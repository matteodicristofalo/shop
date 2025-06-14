# Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY tsconfig.json ./

RUN npm run build


# Test
FROM mcr.microsoft.com/playwright:v1.52.0-noble AS test

WORKDIR /app

COPY ./package.json ./
COPY ./playwright.config.ts ./
COPY ./tests ./tests
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

CMD ["npm", "run", "test"]
