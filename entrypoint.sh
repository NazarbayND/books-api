#!/bin/sh

npx prisma generate

npx prisma migrate dev --name init

npx prisma migrate deploy

npx node prisma/seed.js

npm start
