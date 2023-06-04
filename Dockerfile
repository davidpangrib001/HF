FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y curl

RUN curl -fsSL http://deb.nodesource.com/setup_lts.x | bash - &&\
apt-get install -y nodejs

RUN mkdir bookworm
WORKDIR /bookworm

COPY . /bookworm

EXPOSE 3000

CMD ["node", "app.js"]