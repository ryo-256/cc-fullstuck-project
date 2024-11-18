FROM node:lts
RUN apt-get update && apt-get install -y postgresql-client
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
