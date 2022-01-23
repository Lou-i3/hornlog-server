FROM node:14

WORKDIR /hornlog-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start