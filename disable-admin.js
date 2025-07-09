const fs = require('fs');
const path = require('path');

console.log('🔧 Désactivation de l\'admin pour éviter les problèmes de mémoire...');

try {
  const configPath = path.join(__dirname, 'medusa-config.ts');
  let content = fs.readFileSync(configPath, 'utf8');
  
  // Remplacer enable: true par disable: true
  content = content.replace(/enable:\s*true/g, 'disable: true');
  
  fs.writeFileSync(configPath, content);
  console.log('✅ Admin désactivé avec succès');
} catch (error) {
  console.log('⚠️ Erreur lors de la désactivation de l\'admin:', error.message);
  console.log('Continuons sans admin...');
}
