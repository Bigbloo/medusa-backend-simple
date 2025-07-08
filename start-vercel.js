const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage Medusa sur Vercel...');

// Configuration pour Vercel
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

// Fonction pour exécuter les migrations
async function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log('🔄 Exécution des migrations...');
    exec('npx medusa db:migrate', (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️ Migrations échouées, continuons...', error.message);
        resolve();
      } else {
        console.log('✅ Migrations terminées');
        resolve();
      }
    });
  });
}

// Fonction pour créer l'admin
async function createAdmin() {
  return new Promise((resolve, reject) => {
    console.log('👤 Création de l\'utilisateur admin...');
    exec('npx medusa exec ./src/scripts/create-admin.ts', (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️ Admin déjà existant ou erreur');
      } else {
        console.log('✅ Admin créé avec succès');
      }
      resolve();
    });
  });
}

// Fonction principale
async function startMedusa() {
  try {
    // Attendre un peu pour la base de données
    console.log('⏳ Attente de la base de données...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Exécuter les migrations
    await runMigrations();
    
    // Créer l'admin
    await createAdmin();
    
    // Démarrer Medusa
    console.log('🎯 Démarrage du serveur Medusa...');
    const medusa = require('@medusajs/medusa');
    
    // Démarrer le serveur
    exec(`npx medusa start --port ${process.env.PORT}`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Erreur de démarrage:', error);
        return;
      }
      console.log('✅ Serveur Medusa démarré avec succès');
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
  }
}

// Démarrer l'application
startMedusa();
