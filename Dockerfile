FROM node:16-alpine
WORKDIR /app
RUN npm cache clean --force
RUN npm i yarn
COPY --chown=node:node . . 
RUN npm i --force
RUN yarn
RUN yarn add xlsx --force
RUN yarn add history --force
RUN mkdir -p /app/node_modules/pdfmake/examples
COPY ./examples ./node_modules/pdfmake/examples
WORKDIR /app/node_modules/pdfmake
RUN npm install --force 
RUN npm run build:vfs
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start:prod"] 
