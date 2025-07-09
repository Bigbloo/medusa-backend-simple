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

# Sauvegarder la config originale et désactiver temporairement l'admin
echo "🔧 Désactivation temporaire de l'admin pour démarrage rapide..."
cp medusa-config.ts medusa-config.ts.backup
sed -i.tmp 's/enable: true/disable: true/g' medusa-config.ts || sed -i 's/enable: true/disable: true/g' medusa-config.ts

# Démarrer le serveur SANS admin pour éviter le timeout
echo "🎯 Démarrage immédiat du serveur Medusa..."
NODE_OPTIONS="--max-old-space-size=256" npx medusa start --host 0.0.0.0 --port $PORT &
SERVER_PID=$!

# Attendre que le port soit ouvert
echo "⏳ Attente de l'ouverture du port $PORT..."
sleep 15

# Restaurer la config originale et faire le build admin
echo "🔄 Restauration de la config admin..."
mv medusa-config.ts.backup medusa-config.ts

echo "🎨 Construction de l'interface admin en arrière-plan..."
(sleep 30 && set -a && source .env.build && set +a && npm run build:admin:fast || echo "⚠️ Build admin échoué") &

# Attendre le serveur principal
wait $SERVER_PID
