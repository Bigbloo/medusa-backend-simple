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
echo "🔄 Exécution forcée des migrations..."
npx medusa db:migrate --force || echo "⚠️ Migrations échouées, continuons..."

# Vérifier si les tables existent maintenant
echo "🔍 Vérification des tables..."
npx medusa db:migrate --dry-run || echo "⚠️ Vérification échouée"

# Démarrer le serveur
echo "🎯 Démarrage du serveur Medusa..."
exec npx medusa start
