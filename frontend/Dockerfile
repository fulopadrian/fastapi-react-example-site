# Set base image
FROM ubuntu:20.04

# Install system dependencies
RUN apt-get -yqq update
RUN apt-get install -yq nodejs

# Copy code to container
WORKDIR /opt/todo-app
COPY . .

# Install ap specific dependencies
RUN npm install
RUN npm run build

# Expose port
EXPOSE 80

# Start app
CMD ["npm", "start"]