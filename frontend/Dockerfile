# 1. Base image
FROM node:18 AS build

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your frontend code
COPY . .

# 5. Build the frontend
RUN npm run build

# -------------------
# Production image
# -------------------
FROM nginx:alpine

# 6. Copy built frontend to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Expose port 80
EXPOSE 80

# 9. Start Nginx
CMD ["nginx", "-g", "daemon off;"]
