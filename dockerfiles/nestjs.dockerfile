FROM node

WORKDIR /app

COPY my-blog-server/package.json /app

RUN npm install

COPY my-blog-server/ /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]