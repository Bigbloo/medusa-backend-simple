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

# Créer un utilisateur admin si nécessaire
echo "👤 Création de l'utilisateur admin..."
npx medusa exec ./src/scripts/create-admin.ts || echo "⚠️ Admin déjà existant ou erreur"

# Construire l'admin si nécessaire
echo "🏗️ Vérification et construction de l'admin..."
if [ ! -f ".medusa/admin/index.html" ]; then
    echo "📱 Construction de l'interface admin avec mémoire limitée..."
    timeout 300 NODE_OPTIONS="--max-old-space-size=1024" npx medusa build --admin-only || echo "⚠️ Build admin échoué (mémoire insuffisante), continuons avec API seulement"
fi

# Démarrer le serveur
echo "🎯 Démarrage du serveur Medusa..."
exec npx medusa start --host 0.0.0.0 --port $PORT
