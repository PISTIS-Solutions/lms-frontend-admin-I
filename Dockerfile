# Build stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies based on package.json and package-lock.json
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build --legacy-peer-deps

# Production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the built artifacts from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

# Copy npm from the build stage (This is the key fix!)
COPY --from=build /usr/local/bin/npm /usr/local/bin/npm 

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]