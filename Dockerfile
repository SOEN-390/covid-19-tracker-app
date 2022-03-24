FROM node:latest
ARG PORT=80

RUN npm install -g ionic
RUN npm -g i eslint-cli

RUN mkdir -p /var/code/
WORKDIR /var/code/

COPY package.json .
RUN npm install

COPY src src
COPY public public
COPY .eslintrc.json ./
COPY ionic.config.json ./
COPY capacitor.config.ts ./
COPY capacitor.config.json ./
COPY tsconfig.json ./
COPY aws-ecs-task-definition.json ./

EXPOSE $PORT

CMD ionic serve --external
