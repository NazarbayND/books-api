FROM node:20

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
COPY ./prisma ./prisma

RUN npm install

RUN npm install -g typescript

RUN npx prisma generate

RUN npm run build

COPY ./entrypoint.sh /usr/app/entrypoint.sh
RUN chmod +x /usr/app/entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
