FROM node:lts-alpine

ENV API_PORT 3001

RUN mkdir /app

WORKDIR /app

COPY pages pages
COPY styles styles
COPY components components
COPY utils utils
COPY package.json .

RUN npm install
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD npm start