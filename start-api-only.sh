#!/bin/bash
set -e

echo "🚀 Démarrage Medusa API UNIQUEMENT (sans admin)..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 15

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npx medusa db:migrate || echo "⚠️ Migrations échouées, continuons..."

# Créer un fichier de configuration temporaire sans admin
echo "🔧 Configuration API uniquement..."
cat > medusa-config-api-only.js << 'EOF'
const { defineConfig } = require("@medusajs/framework/utils")

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:7000",
      authCors: process.env.AUTH_CORS || "http://localhost:8000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: process.env.REDIS_URL,
  },
  // ADMIN COMPLÈTEMENT DÉSACTIVÉ
  admin: {
    disable: true
  },
  modules: [
    {
      resolve: "@medusajs/medusa/cache-inmemory",
      key: "cache-service",
    },
    {
      resolve: "@medusajs/medusa/event-bus-local",
      key: "event-bus-service",
    },
  ],
})
EOF

echo "✅ Configuration API créée"

# Démarrer le serveur API uniquement avec la config modifiée
echo "🎯 Démarrage du serveur Medusa (API UNIQUEMENT)..."
exec NODE_OPTIONS="--max-old-space-size=256" npx medusa start --config medusa-config-api-only.js --host 0.0.0.0 --port $PORT
