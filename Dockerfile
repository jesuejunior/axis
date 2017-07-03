FROM node:6.9.4-alpine
MAINTAINER Jesue Junior <jesuesousa@gmail.com>

WORKDIR /app
COPY package.json .
COPY src/ ./src
RUN npm i --production --no-progress

EXPOSE 8000

CMD ["node", "src/app.js"]