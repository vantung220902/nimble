# ----------> The build image
FROM node:20-bullseye-slim as build

WORKDIR /usr/src/app

RUN corepack enable

COPY . .

RUN yarn

RUN npx prisma generate

RUN yarn build

# ----------> The production image
FROM gcr.io/distroless/nodejs20-debian11:latest as run

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=build --chown=1000:1000 /usr/src/app/dist dist
COPY --from=build --chown=1000:1000 /usr/src/app/node_modules node_modules
COPY --from=build --chown=1000:1000 /usr/src/app/package.json package.json

COPY --from=build /lib/x86_64-linux-gnu/libz.so.1 /lib/x86_64-linux-gnu/libz.so.1

USER 1000

ENV PATH=/app/node_modules/.bin:$PATH

CMD ["dist/src/main.js"]
