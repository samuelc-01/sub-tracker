# Multi-stage Dockerfile for Node.js apps (supports optional build step)
# Stage 1: deps -> install dependencies
# Stage 2: builder -> copy source, run optional build
# Stage 3: runner -> minimal production image, non-root user

FROM node:18-alpine AS deps
WORKDIR /app
# Install dependencies (uses package-lock.json when present)
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If your project uses a build step (TypeScript, bundlers), run it here
# e.g. RUN npm run build
# If you build to ./dist, the production stage can copy from /app/dist

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the built artifacts or source files needed to run
# If using a build output (dist/), change the COPY to copy that directory instead
COPY --from=builder /app .

USER appuser
EXPOSE 3000
# Default command: adjust if your entry point is different (e.g. dist/app.js)
CMD ["node", "app.js"]

# Tips:
# - If you use TypeScript: run `npm run build` in the builder stage and
#   change CMD to run the compiled file in dist/. Example:
#   RUN npm run build
#   COPY --from=builder /app/dist ./
#   CMD ["node", "dist/app.js"]
# - Provide runtime secrets via environment variables or --env-file. Do NOT
#   bake secrets into the image.
