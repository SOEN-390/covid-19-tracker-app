FROM node:latest@sha256:1ce86d32c73efe0aed0fa2dd7c0ee6d5c03f66e75986736d2d97d0ce1400c0a3
ARG PORT=8100

RUN npm install -g ionic

RUN mkdir -p /var/code/
WORKDIR /var/code/

COPY package.json .
RUN npm install

COPY src src
COPY public public
COPY ionic.config.json ./
COPY capacitor.config.ts ./
COPY tsconfig.json ./

EXPOSE $PORT

CMD ionic serve --external
