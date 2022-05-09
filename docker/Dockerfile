#docker build -t note_app_node .

FROM node:16-alpine3.14

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY docker/config.docker.js env.js
COPY . .

EXPOSE 9052

CMD [ "node", "server.js" ]