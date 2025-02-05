# Dockerfile for the Node Server service
FROM node:20-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm","start"]