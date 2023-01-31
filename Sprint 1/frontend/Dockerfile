FROM node:18-alpine as builder
COPY . /temp
WORKDIR /temp
RUN npm install
RUN npm run build

FROM node:18-alpine
COPY --from=builder temp/build/ /home/node/app/
COPY --from=builder temp/package.json /home/node/app/

EXPOSE 3000

CMD ["node", "/home/node/app/index.js"]