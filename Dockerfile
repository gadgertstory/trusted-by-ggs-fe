FROM node:16-alpine 
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm config set legacy-peer-deps true
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "build:prod","start:prod"]
