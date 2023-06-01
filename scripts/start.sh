#!/usr/bin/env sh

# build
npx nx run backend:build --configuration=production
npx nx run frontend:build --configuration=production
docker build -t shkip/private:game-frontend -f Dockerfile.frontend .
docker build -t shkip/private:game-backend -f Dockerfile.backend .

docker-compose up -d