FROM node:16

LABEL maintainer="Khouloud Meherzi <khouloud.meherzi@esprit.tn>"

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN chown -R node:node /home/node/app

USER node

EXPOSE 9090

CMD ["node", "server.js"]


# FROM node:16

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]