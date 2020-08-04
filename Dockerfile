FROM node:laster

USER root

RUN mkdir /code

WORKDIR /code

RUN npm config set registry https://registry.npm.taobao.org

RUN npm -i

ADD . /code/
