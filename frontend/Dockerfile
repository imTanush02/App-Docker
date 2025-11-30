FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application with nodemon for development
CMD ["npm", "run", "dev"]