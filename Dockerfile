FROM node:14.7.0

USER root

RUN mkdir /code

WORKDIR /code

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

ADD . /code/
