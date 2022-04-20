FROM node:14.19.0-alpine3.15

WORKDIR /app

RUN apk update
RUN apk upgrade

RUN set -ex; apk add --no-cache --virtual .fetch-deps curl tar git ;

COPY package.json package.json

RUN npm install --production
RUN npm audit fix

COPY . .

EXPOSE 8080

CMD node app.js