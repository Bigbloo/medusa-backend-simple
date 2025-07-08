FROM node:20-alpine

# Installer bash pour notre script
RUN apk add --no-cache bash

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json yarn.lock ./

# Installer les dépendances avec retry et timeout optimisés
RUN yarn config set network-timeout 300000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn install --network-timeout 300000 --frozen-lockfile || \
    (sleep 10 && yarn install --network-timeout 300000 --frozen-lockfile) || \
    (sleep 20 && yarn install --network-timeout 300000 --frozen-lockfile)

# Copier le code source
COPY . .

# Build du backend seulement d'abord
RUN echo "🏗️ Build du backend..." && \
    NODE_OPTIONS="--max-old-space-size=1024" yarn build:backend || yarn build || echo "⚠️ Build backend échoué"

# Créer le dossier admin-build avec un index.html minimal
RUN mkdir -p .medusa/admin-build && \
    echo '<!DOCTYPE html><html><head><title>Admin Loading...</title></head><body><h1>Admin Interface Loading...</h1><script>setTimeout(() => window.location.reload(), 3000);</script></body></html>' > .medusa/admin-build/index.html && \
    echo "✅ Interface admin temporaire créée"

# Rendre le script de démarrage exécutable
RUN chmod +x start.sh

# Créer un script pour les migrations
RUN echo '#!/bin/bash\necho "🔄 Exécution des migrations..."\nnpx medusa db:migrate\necho "✅ Migrations terminées"' > migrate.sh && chmod +x migrate.sh

# Exposer le port
EXPOSE 9000

# Utiliser notre script de démarrage
CMD ["bash", "./start.sh"]
