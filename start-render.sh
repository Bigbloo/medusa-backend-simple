#!/bin/bash
set -e

echo "🚀 Démarrage de Medusa avec Interface Admin Complète..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 15

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

# L'utilisateur admin sera créé via l'interface admin native
echo "👤 L'utilisateur admin peut être créé via l'interface /admin"

# Installer les dépendances Rollup manquantes si nécessaire
echo "🔧 Vérification des dépendances Rollup..."
npm install @rollup/rollup-linux-x64-musl --save-dev --legacy-peer-deps || echo "Rollup déjà installé"

# Build de l'interface admin native de Medusa
echo "🎨 Construction de l'interface admin native de Medusa..."
NODE_OPTIONS="--max-old-space-size=256" npx medusa build --admin-only || echo "⚠️ Build admin échoué, l'interface sera générée au démarrage"

# Démarrer le serveur avec l'interface admin
echo "🎯 Démarrage du serveur Medusa avec Admin UI..."
exec NODE_OPTIONS="--max-old-space-size=256" npx medusa start --host 0.0.0.0 --port $PORT
