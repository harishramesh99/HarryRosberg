# ---- Base Image for Building ----
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Copy package.json and package-lock.json first for better caching
    COPY package.json package-lock.json ./
    
    # Install only production dependencies (excludes dev dependencies)
    RUN npm ci --omit=dev
    
    # Copy the rest of the project
    COPY . .
    
    # Build Next.js
    RUN npm run build
    
    # ---- Create a Lightweight Final Image ----
    FROM node:18-alpine
    WORKDIR /app
    
    # Copy only the required files from builder stage
    COPY --from=builder /app/.next .next
    COPY --from=builder /app/public public
    COPY --from=builder /app/package.json package.json
    COPY --from=builder /app/node_modules node_modules
    
    # Expose port and start Next.js
    EXPOSE 3000
    CMD ["npm", "start"]
    