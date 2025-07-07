# 🚀 Medusa Backend - Déploiement Simplifié

## 📋 Description
Ce repository contient **uniquement le backend Medusa** pour faciliter le déploiement sur Railway, Render ou autres plateformes cloud.

## ✅ Prêt pour déploiement sur :
- **Railway** (recommandé)
- **Render.com** (alternative simple)
- **Heroku**
- **DigitalOcean App Platform**

## 🔧 Configuration automatique incluse :
- `nixpacks.toml` - Configuration Nixpacks pour Railway
- `railway.json` - Configuration Railway
- `.env` - Variables d'environnement (à configurer)

## 🚀 Déploiement Railway

### 1. Créer un projet Railway
1. Allez sur **https://railway.app**
2. **New Project** → **Deploy from GitHub repo**
3. Sélectionnez ce repository
4. Railway détectera automatiquement Node.js

### 2. Ajouter PostgreSQL
1. **+ New** → **Database** → **PostgreSQL**
2. Railway connectera automatiquement la base

### 3. Variables d'environnement
```env
NODE_ENV=production
PORT=9000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=votre_secret_jwt_super_securise
COOKIE_SECRET=votre_secret_cookie_super_securise
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
STORE_CORS=https://votre-frontend.vercel.app
ADMIN_CORS=https://votre-backend.railway.app
AUTH_CORS=https://votre-frontend.vercel.app,https://votre-backend.railway.app
```

### 4. Stripe (optionnel)
```env
STRIPE_API_KEY=sk_test_VOTRE_CLE_STRIPE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET
```

## 🧪 Test après déploiement
- **Health check** : `https://votre-backend.railway.app/health`
- **Admin** : `https://votre-backend.railway.app/app`

## 👤 Créer un utilisateur admin
Via Railway Console :
```bash
npx medusa user --email admin@votre-boutique.com --password VotreMotDePasse123
```

## 🔗 Frontend
Le frontend Next.js est dans le repository principal : [Medusa-boutique1](https://github.com/Bigbloo/Medusa-boutique1)

---

**🎯 Ce repository simplifie le déploiement en évitant les problèmes de Root Directory !**
