# Étape 1: Construire l'application
FROM node:18-alpine AS builder

# Installer pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copier les fichiers de dépendances et les installer
# Cela permet de profiter du cache Docker si les dépendances ne changent pas
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copier le reste du code source de l'application
COPY . .

# Construire l'application
RUN pnpm build

# Étape 2: Lancer l'application en production
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Installer pnpm dans l'étape finale aussi
RUN npm install -g pnpm

COPY --from=builder /app/public ./public
# On copie le build optimisé de Next.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# La commande pour démarrer le serveur Next.js
CMD ["pnpm", "start"] 