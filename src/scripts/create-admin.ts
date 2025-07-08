import { MedusaContainer } from "@medusajs/framework"

async function createAdmin() {
  try {
    // Créer un utilisateur admin via l'API
    console.log("✅ Script de création d'admin exécuté")
    console.log("📧 Email par défaut: inoussa.bance91@gmail.com")
    console.log("🔑 Mot de passe par défaut: onyarrivera")
    console.log("💡 Utilisez la commande CLI pour créer l'admin:")
    console.log("npx medusa user create --email inoussa.bance91@gmail.com --password onyarrivera")
  } catch (error) {
    console.error("❌ Erreur:", error)
  }

  process.exit(0)
}

createAdmin()
