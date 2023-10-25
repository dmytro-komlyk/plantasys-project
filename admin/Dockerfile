# Build Stage
FROM node:latest AS base
WORKDIR /app/admin
COPY package*.json ./
COPY next.config.js ./
COPY .env.local.example ./.env.local
EXPOSE 3002

# Development Stage
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Production Stage
FROM base AS production
RUN npm ci
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]