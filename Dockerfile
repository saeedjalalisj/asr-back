FROM node:latest

WORKDIR /opt/src/app

RUN apt-get update && apt-get install -y netcat

ENV path /opt/src/app/node_modules/.bin:$PATH

COPY . /opt/src/app

RUN npm i -g dotenv-cli
RUN npm i

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]