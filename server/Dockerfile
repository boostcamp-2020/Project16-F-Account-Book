FROM node:12.18.3-alpine

WORKDIR /usr/src/app

COPY ./server/build ./src
COPY ./server/package.json .

RUN yarn install --production

CMD [ "node", "src/index.js" ]