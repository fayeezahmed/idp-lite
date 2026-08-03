FROM node:25 AS base

WORKDIR /app/

COPY . /app/ 

RUN npm install

FROM base AS execute

CMD ["npm", "run", "start"]


