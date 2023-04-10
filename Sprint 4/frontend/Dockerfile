FROM node:18-alpine as builder
COPY . /temp
WORKDIR /temp
ENV PUBLIC_API_URL="https://firmic-backend.dynv6.net"
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "/temp/build/index.js"]