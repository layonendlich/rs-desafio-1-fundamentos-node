FROM node:22-alpine AS node-base
RUN mkdir -p /usr/src/rs-desafio-1-fundamentos-node
WORKDIR /usr/src/rs-desafio-1-fundamentos-node
COPY . .
RUN npm install

FROM node-base AS node-app
WORKDIR /usr/src/rs-desafio-1-fundamentos-node
EXPOSE 3333
CMD ["npm", "run", "start"]