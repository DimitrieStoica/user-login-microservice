# Install Node.js docker container
FROM node:0.10-onbuild

# Bundle app source
COPY . /news-microservice

# Install app dependencies
ADD package.json /news-microservice/package.json
RUN cd /news-microservice && npm install
RUN mkdir -p /opt/app && cp -a /news-microservice/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

# Environment variables
ENV NODE_ENV production
ENV EXPRESS_PORT 80

CMD ["node", "/news-microservice/server.js"]
