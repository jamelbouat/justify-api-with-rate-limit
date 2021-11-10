FROM node:16

LABEL description="justify-api"

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
