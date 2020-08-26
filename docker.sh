docker build . -t vue-apitest

docker run -d -p 9538:9528 vue-apitest