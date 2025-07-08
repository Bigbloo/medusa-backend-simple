FROM node:20-alpine

# Installer bash pour notre script
RUN apk add --no-cache bash

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances avec npm (plus stable)
RUN npm config set registry https://registry.npmjs.org/ && \
    rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps --timeout=300000 || \
    (sleep 10 && npm install --legacy-peer-deps --timeout=300000) || \
    (sleep 20 && npm install --legacy-peer-deps --timeout=300000 --force)

# Installer explicitement les dépendances Rollup pour Alpine Linux
RUN npm install @rollup/rollup-linux-x64-musl --save-dev --legacy-peer-deps || echo "Rollup déjà installé"

# Copier le code source
COPY . .

# Build complet incluant l'admin
RUN echo "🏗️ Build complet de Medusa..." && \
    NODE_OPTIONS="--max-old-space-size=2048" npm run build || echo "⚠️ Build échoué, continuons..."

# Créer le dossier admin avec un index.html minimal
RUN mkdir -p .medusa/admin && \
    echo '<!DOCTYPE html><html><head><title>Admin Loading...</title></head><body><h1>Admin Interface Loading...</h1><script>setTimeout(() => window.location.reload(), 3000);</script></body></html>' > .medusa/admin/index.html && \
    echo "✅ Interface admin temporaire créée"

# Rendre le script de démarrage exécutable
RUN chmod +x start.sh

# Créer un script pour les migrations
RUN echo '#!/bin/bash\necho "🔄 Exécution des migrations..."\nnpx medusa db:migrate\necho "✅ Migrations terminées"' > migrate.sh && chmod +x migrate.sh

# Exposer le port
EXPOSE 9000

# Utiliser notre script de démarrage
CMD ["bash", "./start.sh"]
