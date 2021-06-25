FROM node:14.16.0

LABEL version="1.0"
LABEL description="Naranja X Job Interview Challenge"
LABEL maintainer = ["juan.gidoni@gmail.com"]

WORKDIR /.

COPY ["package.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]
