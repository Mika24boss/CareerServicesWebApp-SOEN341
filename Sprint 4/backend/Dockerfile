FROM node:18-alpine
COPY . /home/node/app/
WORKDIR /home/node/app/
RUN npm install

EXPOSE 5000

CMD ["node", "/home/node/app/server.js"]