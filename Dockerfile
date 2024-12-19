# Step 1: Build the Angular application
FROM node:18 AS build

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the Angular project
COPY . .

# Replace the environment file with a custom one
RUN echo "export const environment = { production: false, API_URL: '${API_URL}' };" > src/environments/environment.ts

# Build the Angular project
RUN npm run build --prod

# Step 2: Set up the Nginx server to serve the Angular app
FROM nginx:alpine

# Copy the built Angular files to the Nginx server
COPY --from=build /app/dist/angular18app/browser /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
