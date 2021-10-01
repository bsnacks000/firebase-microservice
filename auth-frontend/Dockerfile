FROM node:14.17.6-slim as node-base

FROM node-base as development

RUN mkdir /code/
WORKDIR /code/

ENV PATH /code/node_modules/.bin:$PATH

ADD . /code/
COPY . /code
RUN npm install && chmod +x /code/docker-entrypoint.sh


EXPOSE 3000