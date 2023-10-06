# Use a smaller base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN yarn

# Copy the rest of the source code
COPY . .

# Start the application
CMD ["yarn", "run", "start:dev"]