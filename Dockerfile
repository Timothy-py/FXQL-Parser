FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]