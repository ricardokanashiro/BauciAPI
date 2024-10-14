FROM node:16

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

RUN mkdir -p /usr/app/uploads

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]