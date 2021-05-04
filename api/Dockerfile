FROM node:12-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
USER node
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]