FROM node:latest@sha256:f9b18e024fc10ebc95d53c5d7cd6858779a7e3670ec6d24bebe8f2353fdf37b1
ARG PORT=8100

RUN npm install -g ionic
RUN npm -g i eslint-cli

RUN mkdir -p /var/code/
WORKDIR /var/code/

COPY package.json ./
RUN npm install

COPY src src
COPY public public
COPY ionic.config.json ./
COPY capacitor.config.ts ./
COPY capacitor.config.ts ./
COPY tsconfig.json ./
COPY .eslintrc.json ./

EXPOSE $PORT

CMD ionic serve --external
