# Create image based on the official Node 6 image from the dockerhub
FROM node:latest

WORKDIR /app/frontend
# Copy dependency definitions
COPY package.json /app/frontend
# Install dependecies
RUN npm install
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 5000 5001
# Serve the app
CMD ["npm", "start"]