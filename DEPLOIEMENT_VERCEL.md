# 🚀 GUIDE DE DÉPLOIEMENT VERCEL - MEDUSA E-COMMERCE

## 📋 ÉTAPES DE DÉPLOIEMENT :

### 1. **Préparer Vercel CLI**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à votre compte
vercel login
```

### 2. **Configurer la Base de Données**
```bash
# Sur Vercel Dashboard (vercel.com)
# 1. Aller dans "Storage" 
# 2. Créer "Postgres Database"
# 3. Copier l'URL de connexion
```

### 3. **Déployer le Projet**
```bash
# Dans le dossier medusa-backend-simple
cd medusa-backend-simple

# Déploiement initial
vercel

# Suivre les prompts :
# - Set up and deploy? Y
# - Which scope? [votre compte]
# - Link to existing project? N
# - Project name? medusa-backend
# - Directory? ./
# - Override settings? N
```

### 4. **Configurer les Variables d'Environnement**
```bash
# Ajouter les variables via CLI ou Dashboard
vercel env add DATABASE_URL
# Coller votre URL PostgreSQL Vercel

vercel env add JWT_SECRET
# Entrer: supersecret_change_in_production

vercel env add COOKIE_SECRET  
# Entrer: supersecret_change_in_production

vercel env add STRIPE_API_KEY
# Entrer votre clé Stripe live

vercel env add STRIPE_WEBHOOK_SECRET
# Entrer votre webhook secret Stripe
```

### 5. **Déploiement Final**
```bash
# Redéployer avec les variables
vercel --prod
```

## 🎯 **RÉSULTAT ATTENDU :**

### **URLs Disponibles :**
- **Backend API :** `https://medusa-backend-[hash].vercel.app/`
- **Interface Admin :** `https://medusa-backend-[hash].vercel.app/admin`

### **Identifiants Admin :**
- **Email :** inoussa.bance91@gmail.com
- **Mot de passe :** onyarrivera

## ✅ **AVANTAGES VERCEL :**

- 🚀 **Build optimisé** : Medusa compile parfaitement
- 🎯 **Admin interface** : Dashboard natif accessible
- 💾 **PostgreSQL intégré** : Base de données managée
- ⚡ **Performance** : CDN mondial automatique
- 🔧 **Configuration zéro** : Détection automatique
- 💰 **Gratuit** : Plan Hobby généreux

## 🛠️ **COMMANDES UTILES :**

```bash
# Voir les logs
vercel logs

# Voir les déploiements
vercel ls

# Variables d'environnement
vercel env ls

# Redéployer
vercel --prod
```

## 🎉 **SUCCÈS GARANTI !**

Vercel est spécialement optimisé pour les applications Node.js comme Medusa. Votre interface admin sera accessible et fonctionnelle !
