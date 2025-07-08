#!/bin/bash

# Script de démarrage pour Medusa sur Railway
echo "🚀 Démarrage de Medusa..."

# Attendre que la base de données soit disponible
echo "⏳ Vérification de la connexion à la base de données..."
until npx medusa db:migrate --dry-run > /dev/null 2>&1; do
  echo "⏳ En attente de la base de données..."
  sleep 2
done

echo "✅ Base de données accessible"

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate

# Démarrer le serveur
echo "🎯 Démarrage du serveur Medusa..."
exec medusa start
