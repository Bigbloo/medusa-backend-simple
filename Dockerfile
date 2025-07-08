FROM node:18-alpine

# Installer bash pour notre script
RUN apk add --no-cache bash

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le code source
COPY . .

# Build de l'application (SANS migrations)
RUN yarn build

# Rendre le script de démarrage exécutable
RUN chmod +x start.sh

# Exposer le port
EXPOSE 9000

# Utiliser notre script de démarrage
CMD ["./start.sh"]
