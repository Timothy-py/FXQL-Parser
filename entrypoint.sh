#!/bin/sh

npx prisma db push

if [ "$NODE_ENV" = "PRODUCTION" ]; then
    echo "Starting production server"
    yarn start:prod
else
    echo "Starting development server"
    yarn start:dev
fi