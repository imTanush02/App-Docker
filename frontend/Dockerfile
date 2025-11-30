FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Environment variables
ENV NODE_ENV=production
ENV BACKEND_URL=http://backend:8000/api

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]