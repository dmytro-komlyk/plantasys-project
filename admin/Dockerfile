# Build Stage
FROM node:latest AS base
WORKDIR /app/admin
COPY package*.json ./
COPY .env.example ./.env.local
EXPOSE 3002

# Development Stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY ./ ./
CMD ["npm", "run", "dev"]

# Production Stage
FROM base AS production
ENV NODE_ENV=production
RUN npm ci
COPY ./ ./
RUN npm run build

CMD ["npm", "run", "start"]