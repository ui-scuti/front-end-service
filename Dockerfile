FROM node:16

# Create app directory
WORKDIR /usr/src

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
WORKDIR /usr/src/app

EXPOSE 8051
CMD [ "sh", "entry_point.sh" ]