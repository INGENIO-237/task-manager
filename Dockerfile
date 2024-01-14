FROM node:21
WORKDIR /src
COPY package* .
RUN npm install
COPY src .
CMD ["npm", "run", "dev"]