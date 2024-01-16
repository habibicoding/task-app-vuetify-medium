# Use Node.js LTS version with Alpine as base image for the build stage
FROM node:lts-alpine as build-stage
# Set the working directory to /app inside the container
WORKDIR /app
# Copy package.json and package-lock.json (if available) to /app
COPY package*.json ./
# Globally install pnpm inside the container
RUN npm install -g pnpm
# Install project dependencies using pnpm
RUN pnpm install
# Copy all other files from the project directory to /app
COPY . .
# Run the build command as defined in package.json
RUN pnpm build


# Use stable Nginx on Alpine as base image for the production stage
FROM nginx:stable-alpine as production-stage
# Copy custom nginx.conf to the Nginx config folder in the container
COPY nginx.conf /etc/nginx/nginx.conf
# Copy built Vue app from build-stage to Nginx's serving directory
COPY --from=build-stage /app/dist /usr/share/nginx/html


 # Start Nginx with daemon off (Nginx runs in the foreground)
CMD ["nginx", "-g", "daemon off;"]
