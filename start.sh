#!/bin/bash
set -e

# Script de démarrage pour Medusa sur Railway
echo "🚀 Démarrage de Medusa v4..."

# Afficher les variables d'environnement importantes
echo "📋 Variables d'environnement:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..."

# Attendre que la base de données soit disponible
echo "⏳ Attente de la base de données..."
sleep 15

# Forcer l'exécution des migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

# L'utilisateur admin sera créé via l'interface admin native
echo "👤 L'utilisateur admin peut être créé via l'interface /admin"

# Construire l'interface admin native de Medusa avec plus de mémoire
echo "🏗️ Construction de l'interface admin native de Medusa..."
NODE_OPTIONS="--max-old-space-size=2048" npx medusa build || echo "⚠️ Build échoué, continuons..."

# Démarrer le serveur avec admin activé
echo "🎯 Démarrage du serveur Medusa avec admin..."
exec npx medusa start --host 0.0.0.0 --port $PORT
