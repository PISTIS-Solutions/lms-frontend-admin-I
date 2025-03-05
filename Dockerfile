# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire source code
COPY . .


# Build the app
RUN npm run build --legacy-peer-deps

# RUN ls -la
# RUN ls -la /app


# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/src/assets /app/src/assets  
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

# Copy npm from the build stage
COPY --from=build /usr/local/bin/npm /usr/local/bin/npm

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

