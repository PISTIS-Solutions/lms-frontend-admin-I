# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire source code
COPY . .

# Debugging: List files before build
RUN ls -la /app

# Build the app
RUN npm run build --legacy-peer-deps

# Debugging: List files after build
RUN ls -la /app

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/src/assets /app/src/assets  
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force

# Debugging: Check final files
RUN ls -la /app

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
