# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files and install them
COPY package*.json tsconfig.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your server runs on
EXPOSE 4000

# Start the compiled JavaScript server
CMD ["npm", "start"]
