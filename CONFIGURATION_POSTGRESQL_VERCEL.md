# 🗄️ CONFIGURATION POSTGRESQL SUR VERCEL

## 📋 ÉTAPES APRÈS DÉPLOIEMENT :

### 1. **Créer la Base de Données PostgreSQL**
```bash
# Sur vercel.com Dashboard
# 1. Aller dans votre projet "medusa-backend-simple"
# 2. Cliquer sur "Storage" dans le menu
# 3. Cliquer "Create Database"
# 4. Sélectionner "Postgres"
# 5. Nom: medusa-db
# 6. Région: choisir la plus proche (Europe West)
```

### 2. **Récupérer l'URL de Connexion**
```bash
# Dans Storage > medusa-db > .env.local
# Copier la ligne DATABASE_URL
# Format: postgresql://username:password@hostname:port/database
```

### 3. **Configurer les Variables d'Environnement**
```bash
# Via Dashboard Vercel ou CLI
vercel env add DATABASE_URL
# Coller l'URL PostgreSQL complète

vercel env add JWT_SECRET
# Valeur: supersecret_change_in_production_2024

vercel env add COOKIE_SECRET
# Valeur: supersecret_change_in_production_2024

vercel env add STRIPE_API_KEY
# Valeur: votre_clé_stripe_ici

vercel env add STRIPE_WEBHOOK_SECRET
# Valeur: votre_webhook_secret_stripe_ici
```

### 4. **Redéployer l'Application**
```bash
# Déclencher un nouveau déploiement
vercel --prod
```

### 5. **Initialiser la Base de Données**
```bash
# Une fois déployé, aller sur votre URL Vercel
# L'application va automatiquement créer les tables
# Exemple: https://medusa-backend-simple.vercel.app
```

### 6. **Créer un Utilisateur Admin**
```bash
# Via l'API ou directement en base
# L'interface admin sera disponible sur /admin
```

## 🔧 VÉRIFICATIONS :

- ✅ Base PostgreSQL créée sur Vercel
- ✅ Variables d'environnement configurées
- ✅ Application redéployée
- ✅ Tables créées automatiquement
- ✅ Interface admin accessible sur /admin

## 📝 NOTES :

- L'interface admin native de Medusa est maintenant activée
- Accès via : `https://votre-app.vercel.app/admin`
- Les interfaces personnalisées ont été désactivées
- Seule l'interface admin officielle de Medusa est disponible
