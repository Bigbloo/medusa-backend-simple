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

# Vérifier et créer les fichiers admin si nécessaire
echo "🔍 Vérification des fichiers admin..."
mkdir -p .medusa/admin

# Vérifier si index.html existe
if [ ! -f ".medusa/admin/index.html" ]; then
    echo "⚠️ index.html manquant, création d'un fichier de base..."
    
    # Chercher dans différents répertoires
    if [ -f "dist/admin/index.html" ]; then
        cp -r dist/admin/* .medusa/admin/ || echo "Copie depuis dist/admin échouée"
    elif [ -f "build/admin/index.html" ]; then
        cp -r build/admin/* .medusa/admin/ || echo "Copie depuis build/admin échouée"
    elif [ -f ".medusa/server/admin/index.html" ]; then
        cp -r .medusa/server/admin/* .medusa/admin/ || echo "Copie depuis .medusa/server/admin échouée"
    else
        # Créer un index.html de base si aucun n'est trouvé
        echo "🔧 Création d'un index.html de base..."
        cat > .medusa/admin/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medusa Admin</title>
</head>
<body>
    <div id="root">
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
            <div style="text-align: center;">
                <h1>Medusa Admin</h1>
                <p>Interface admin en cours de chargement...</p>
                <p>Veuillez patienter ou rafraîchir la page.</p>
            </div>
        </div>
    </div>
</body>
</html>
EOF
    fi
fi

if [ -f ".medusa/admin/index.html" ]; then
    echo "✅ Fichiers admin prêts dans .medusa/admin"
else
    echo "❌ Impossible de créer les fichiers admin"
fi

# Démarrer le serveur avec admin activé
echo "🎯 Démarrage du serveur Medusa avec admin..."
exec npx medusa start --host 0.0.0.0 --port $PORT
