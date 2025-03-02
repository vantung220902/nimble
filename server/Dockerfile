# ----------> The build image
FROM node:20-bullseye-slim as build

WORKDIR /usr/src/app

RUN corepack enable

COPY . .

ENV PUPPETEER_SKIP_DOWNLOAD true

RUN yarn

RUN npx prisma generate

RUN NODE_OPTIONS="--max-old-space-size=6144" yarn build

# ----------> The production image
FROM node:20-bullseye-slim as run

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN npx puppeteer browsers install chrome

# Install chromium dependencies
RUN apt-get update \
  && apt-get install -y \
  libnss3 libnss3-dev \
  libnspr4 libnspr4-dev \
  libdbus-1-3 \
  libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libatspi2.0-0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libc6 \
  libcairo2 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libpango-1.0-0 libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 libx11-xcb1 libxcb1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils

COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/package.json package.json

CMD ["node", "dist/src/main"]
