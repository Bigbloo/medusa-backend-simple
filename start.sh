#!/bin/bash

# Script de démarrage pour Medusa sur Railway
echo "🚀 Démarrage de Medusa v3..."

# Afficher les variables d'environnement importantes
echo "📋 Variables d'environnement:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..."

# Attendre que la base de données soit disponible
echo "⏳ Attente de la base de données..."
sleep 10

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
./migrate.sh

# Démarrer le serveur
echo "🎯 Démarrage du serveur Medusa..."
npx medusa start
