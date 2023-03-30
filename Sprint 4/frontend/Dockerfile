FROM node:18-alpine as builder
COPY . /temp
WORKDIR /temp
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "/temp/build/index.js"]