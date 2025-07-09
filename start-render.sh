#!/bin/bash
set -e

echo "🚀 Démarrage de Medusa - API SEULEMENT (sans admin)..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 15

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

# Installer les dépendances Rollup manquantes si nécessaire
echo "🔧 Vérification des dépendances Rollup..."
npm install @rollup/rollup-linux-x64-musl --save-dev --legacy-peer-deps || echo "Rollup déjà installé"

# Désactiver l'admin dans la configuration
node disable-admin.js

# Démarrer le serveur API uniquement
echo "🎯 Démarrage du serveur Medusa (API uniquement)..."
exec NODE_OPTIONS="--max-old-space-size=256" npx medusa start --host 0.0.0.0 --port $PORT
