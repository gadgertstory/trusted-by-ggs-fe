###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build
WORKDIR /app
COPY --chown=node:node . . 
RUN npm install --force
COPY ./examples ./node_modules/pdfmake
WORKDIR /app/node_modules/pdfmake
RUN npm install
RUN npm run build:vfs
WORKDIR /app
RUN npm run build:prod
###################
# PRODUCTION
###################

FROM node:16-alpine As production
# Copy the bundled code from the build stage to the production image

WORKDIR /app
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/build ./build
RUN npm install -g serve
# Start the server using the production build
EXPOSE 3000
# CMD ["npm", "run", "start:prod"] 
CMD serve -s build
