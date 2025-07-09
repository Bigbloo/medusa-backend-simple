#!/bin/bash
set -e

echo "🚀 Démarrage Medusa API UNIQUEMENT (sans admin)..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 15

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

echo "🔧 Admin désactivé dans medusa-config.ts"

# Démarrer le serveur API uniquement
echo "🎯 Démarrage du serveur Medusa (API UNIQUEMENT)..."
export NODE_OPTIONS="--max-old-space-size=256"
exec npx medusa start --host 0.0.0.0 --port $PORT
