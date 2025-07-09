import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const body = req.body as any
    const { email, password, first_name, last_name } = body

    if (!email || !password) {
      res.status(400).json({ error: "Email et mot de passe requis" })
      return
    }

    const userModuleService = req.scope.resolve("userModuleService") as any
    
    // Vérifier si l'utilisateur existe déjà
    const existingUsers = await userModuleService.listUsers({ email })
    
    if (existingUsers.length > 0) {
      res.status(409).json({ error: "L'utilisateur existe déjà" })
      return
    }

    // Créer l'utilisateur admin
    const adminUser = await userModuleService.createUsers({
      email,
      password,
      first_name: first_name || "Admin",
      last_name: last_name || "User",
    })

    res.status(201).json({
      message: "Utilisateur admin créé avec succès",
      user: {
        id: adminUser.id,
        email: adminUser.email,
        first_name: adminUser.first_name,
        last_name: adminUser.last_name
      }
    })

  } catch (error: any) {
    console.error("Erreur lors de la création de l'admin:", error)
    res.status(500).json({ 
      error: "Erreur interne du serveur",
      details: error.message 
    })
  }
}
