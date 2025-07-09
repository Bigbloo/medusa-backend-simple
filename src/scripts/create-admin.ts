export default async function createAdmin() {
  try {
    // Utilisation directe de l'API pour créer un admin
    const response = await fetch("https://medusa-backend-simple-pio8.onrender.com/admin/invites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@medusa.com",
        role: "admin"
      })
    })

    if (response.ok) {
      console.log("✅ Invitation admin envoyée avec succès !")
      console.log("📧 Email: admin@medusa.com")
      console.log("🔗 Vérifiez votre email pour compléter l'inscription")
    } else {
      const error = await response.text()
      console.error("❌ Erreur:", error)
    }
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'admin:", error)
  }
}
