FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5173


CMD ["npm", "run", "dev"]
