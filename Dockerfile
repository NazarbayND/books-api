FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./prisma ./prisma

RUN npm install -g typescript

RUN npm run build

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
