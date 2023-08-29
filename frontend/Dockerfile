# Set base image
FROM ubuntu:20.04

# Install system dependencies
RUN apt-get -yqq update
RUN apt-get -yqq install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install -yq nodejs

# Copy code to container
WORKDIR /opt/todo-app
COPY . .

# Install app specific dependencies
RUN npm install --force
RUN npm install -g serve --force
RUN npm run build

# Expose port (frontend starts on port 3000)
EXPOSE 80

# Start app
#CMD ["npm", "start"]
CMD ["serve", "-s", "build"]