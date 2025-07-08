const { createMedusaContainer } = require('@medusajs/framework');
const { MedusaModule } = require('@medusajs/framework/modules-sdk');

let app;

async function initializeMedusa() {
  if (!app) {
    console.log('🚀 Initialisation de Medusa pour Vercel...');
    
    try {
      // Créer le container Medusa
      const container = createMedusaContainer();
      
      // Initialiser les modules
      await MedusaModule.bootstrap({
        databaseUrl: process.env.DATABASE_URL,
        projectConfig: {
          databaseUrl: process.env.DATABASE_URL,
          http: {
            storeCors: process.env.STORE_CORS || "http://localhost:8000,https://bigtest-storefront.vercel.app",
            adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:9000,https://medusa-admin-vercel.vercel.app",
            authCors: process.env.AUTH_CORS || "http://localhost:7001,http://localhost:9000,https://medusa-admin-vercel.vercel.app",
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
          }
        }
      });
      
      // Créer l'application Express
      const express = require('express');
      app = express();
      
      // Middleware de base
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      
      // Route de santé
      app.get('/health', (req, res) => {
        res.json({ status: 'OK', message: 'Medusa is running on Vercel' });
      });
      
      // Route principale
      app.get('/', (req, res) => {
        res.json({ 
          message: 'Medusa Backend API',
          admin: '/admin',
          store: '/store',
          health: '/health'
        });
      });
      
      // Routes admin
      app.get('/admin', (req, res) => {
        res.json({ message: 'Admin interface', status: 'available' });
      });
      
      // Routes store
      app.get('/store', (req, res) => {
        res.json({ message: 'Store API', status: 'available' });
      });
      
      console.log('✅ Medusa initialisé avec succès');
      
    } catch (error) {
      console.error('❌ Erreur d\'initialisation:', error);
      throw error;
    }
  }
  
  return app;
}

// Export pour Vercel
module.exports = async (req, res) => {
  try {
    const app = await initializeMedusa();
    return app(req, res);
  } catch (error) {
    console.error('❌ Erreur dans le handler Vercel:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
};
