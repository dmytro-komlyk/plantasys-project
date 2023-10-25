# Base Stage
FROM node:latest AS base
WORKDIR /app/server
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env.example ./.env
EXPOSE 3000

# Development Stage
FROM base AS development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# Production Stage
FROM base AS production
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]