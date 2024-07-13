FROM node:20.11.0

WORKDIR /task


COPY . /task/
EXPOSE 3000
RUN npm install


CMD npm start