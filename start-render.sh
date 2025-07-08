#!/bin/bash
set -e

echo "🚀 Démarrage de Medusa avec Interface Admin Complète..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 15

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

# Créer l'utilisateur admin
echo "👤 Création de l'utilisateur admin..."
npx medusa exec ./src/scripts/create-admin.ts || echo "⚠️ Admin déjà existant ou erreur"

# Build de l'interface admin Medusa
echo "🎨 Construction de l'interface admin Medusa..."
NODE_OPTIONS="--max-old-space-size=2048" npx medusa build --admin-only || echo "⚠️ Build admin échoué"

# Vérifier si l'admin est buildé
if [ -d ".medusa/admin" ]; then
    echo "✅ Interface admin Medusa prête !"
else
    echo "🔧 Création du répertoire admin..."
    mkdir -p .medusa/admin
fi

# Démarrer le serveur avec l'interface admin
echo "🎯 Démarrage du serveur Medusa avec Admin UI..."
exec npx medusa start --host 0.0.0.0 --port $PORT
