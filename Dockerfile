FROM node:12
ENV VIRTUAL_HOST api.diegodorado.com
ENV LETSENCRYPT_HOST api.diegodorado.com
ENV LETSENCRYPT_EMAIL diegodorado@gmail.com
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80
CMD npm start

