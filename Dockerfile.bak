FROM node:16.13.0

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install git -y
RUN apt-get install nodejs -y

RUN git clone -b rest https://github.com/davidpangrib001/node_modules
WORKDIR /app
COPY . /app
CMD ["node", "app.js"]
EXPOSE 6892
