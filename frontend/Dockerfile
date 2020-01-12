# Create image based on the official Node image from dockerhub
FROM node:latest
# Change directory so that our commands run inside this new directory
WORKDIR /app/backend
# Copy dependency definitions
COPY package.json /app/backend
# Install dependecies
RUN npm install
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 3000
# Serve the app
CMD ["npm", "start"]