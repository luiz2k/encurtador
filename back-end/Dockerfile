FROM node:20.14-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.14-alpine as production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 10000
CMD [ "npm", "run", "start:prod" ]
