#!/bin/bash

# Script de démarrage pour Medusa sur Railway
echo "🚀 Démarrage de Medusa v2..."

# Afficher les variables d'environnement importantes
echo "📋 Variables d'environnement:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." # Afficher seulement le début pour la sécurité

# Attendre que la base de données soit disponible
echo "⏳ Vérification de la connexion à la base de données..."
sleep 5

echo "✅ Base de données accessible"

# Exécuter les migrations (création des tables)
echo "🔄 Exécution des migrations..."
npx medusa db:migrate

# Vérifier si les migrations ont réussi
if [ $? -eq 0 ]; then
    echo "✅ Migrations réussies"
else
    echo "❌ Erreur lors des migrations"
    exit 1
fi

# Démarrer le serveur
echo "🎯 Démarrage du serveur Medusa sur le port $PORT..."
exec npx medusa start
