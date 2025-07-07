import { MedusaApp } from "@medusajs/framework"

async function createAdmin() {
  const { container } = await MedusaApp({
    loadEnv: true,
  })

  const userService = container.resolve("userService")

  try {
    // Créer un utilisateur admin
    const admin = await userService.create({
      email: "admin@medusa.com",
      password: "admin123",
      first_name: "Admin",
      last_name: "User",
    })

    console.log("✅ Utilisateur admin créé avec succès !")
    console.log("📧 Email: admin@medusa.com")
    console.log("🔑 Mot de passe: admin123")
    console.log("🆔 ID:", admin.id)
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'admin:", error)
  }

  process.exit(0)
}

createAdmin()
