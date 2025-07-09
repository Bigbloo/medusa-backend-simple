const { Medusa } = require('@medusajs/framework');

let medusaApp;

async function initializeMedusa() {
  if (!medusaApp) {
    console.log('🚀 Initialisation de Medusa pour Vercel...');
    
    try {
      // Créer l'application Medusa
      medusaApp = await Medusa({
        projectConfig: {
          databaseUrl: process.env.DATABASE_URL,
          http: {
            storeCors: process.env.STORE_CORS || "http://localhost:8000,https://bigtest-storefront.vercel.app",
            adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:9000,https://medusa-admin-vercel.vercel.app",
            authCors: process.env.AUTH_CORS || "http://localhost:7001,http://localhost:9000,https://medusa-admin-vercel.vercel.app",
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
          },
          admin: {
            enable: true,
            path: "/admin"
          }
        }
      });
      
      console.log('✅ Medusa initialisé avec succès');
      
    } catch (error) {
      console.error('❌ Erreur d\'initialisation:', error);
      throw error;
    }
  }
  
  return medusaApp;
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
