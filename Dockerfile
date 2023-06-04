FROM ubuntu:lunar

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y curl

RUN curl -fsSL http://deb.nodesource.com/setup_lts.x | bash - &&\
apt-get install -y nodejs
RUN npm i yarn -g
RUN yarn add @bochilteam/scraper

RUN mkdir bookworm
WORKDIR /bookworm

COPY . /bookworm

EXPOSE 3000

CMD ["node", "app.js"]
