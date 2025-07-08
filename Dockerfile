FROM node:20-alpine

# Installer bash pour notre script
RUN apk add --no-cache bash

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le code source
COPY . .

# Build de l'application avec plus de mémoire pour l'admin
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build

# Rendre le script de démarrage exécutable
RUN chmod +x start.sh

# Créer un script pour les migrations
RUN echo '#!/bin/bash\necho "🔄 Exécution des migrations..."\nnpx medusa db:migrate\necho "✅ Migrations terminées"' > migrate.sh && chmod +x migrate.sh

# Exposer le port
EXPOSE 9000

# Utiliser notre script de démarrage
CMD ["bash", "./start.sh"]
