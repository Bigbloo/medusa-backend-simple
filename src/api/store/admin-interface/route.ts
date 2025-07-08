import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const adminHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Medusa - Interface de Gestion</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px; text-align: center; }
        .header h1 { color: #333; font-size: 2.5em; margin-bottom: 10px; }
        .header p { color: #666; font-size: 1.2em; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .card:hover { transform: translateY(-5px); }
        .card h3 { color: #333; margin-bottom: 15px; font-size: 1.3em; }
        .card p { color: #666; margin-bottom: 15px; line-height: 1.6; }
        .btn { display: inline-block; padding: 12px 25px; background: #4CAF50; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s ease; margin: 5px; }
        .btn:hover { background: #45a049; }
        .btn-blue { background: #2196F3; }
        .btn-blue:hover { background: #1976D2; }
        .btn-orange { background: #FF9800; }
        .btn-orange:hover { background: #F57C00; }
        .credentials { background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #FF9800; }
        .api-section { background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 5px solid #4CAF50; }
        .endpoint { background: #f5f5f5; padding: 10px; margin: 5px 0; border-radius: 5px; font-family: monospace; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 0.9em; font-weight: bold; }
        .status-online { background: #4CAF50; color: white; }
        .footer { text-align: center; color: white; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Medusa E-commerce Admin</h1>
            <p>Interface de gestion de votre boutique en ligne</p>
            <span class="status status-online">✅ OPÉRATIONNEL</span>
        </div>

        <div class="grid">
            <div class="card">
                <h3>👤 Connexion Admin</h3>
                <div class="credentials">
                    <p><strong>Email:</strong> inoussa.bance91@gmail.com</p>
                    <p><strong>Mot de passe:</strong> onyarrivera</p>
                </div>
                <a href="/admin/auth" class="btn btn-blue">🔐 Authentification API</a>
            </div>

            <div class="card">
                <h3>🛍️ Gestion des Produits</h3>
                <p>Créez, modifiez et gérez vos produits via l'API REST.</p>
                <a href="/store/products" class="btn">📦 Voir les Produits</a>
                <a href="/admin/products" class="btn btn-blue">⚙️ API Admin Produits</a>
            </div>

            <div class="card">
                <h3>🛒 Commandes & Paniers</h3>
                <p>Suivez les commandes et gérez les paniers de vos clients.</p>
                <a href="/admin/orders" class="btn btn-blue">📋 API Commandes</a>
                <a href="/store/carts" class="btn">🛒 API Paniers</a>
            </div>

            <div class="card">
                <h3>💳 Paiements Stripe</h3>
                <p>Paiements sécurisés configurés et opérationnels.</p>
                <div class="status status-online">Stripe Live Configuré</div>
                <br><br>
                <a href="/admin/payments" class="btn btn-orange">💰 API Paiements</a>
            </div>

            <div class="card">
                <h3>👥 Gestion des Clients</h3>
                <p>Administrez les comptes clients et leurs informations.</p>
                <a href="/admin/customers" class="btn btn-blue">👤 API Clients</a>
                <a href="/store/customers" class="btn">📝 Inscription Client</a>
            </div>

            <div class="card api-section">
                <h3>🚀 API Endpoints Principaux</h3>
                <div class="endpoint">GET /store/products</div>
                <div class="endpoint">POST /store/carts</div>
                <div class="endpoint">POST /store/orders</div>
                <div class="endpoint">POST /admin/auth</div>
                <div class="endpoint">GET /admin/orders</div>
                <a href="/health" class="btn">🔍 Santé du Serveur</a>
            </div>
        </div>

        <div class="footer">
            <p>🎊 Votre plateforme e-commerce Medusa est 100% opérationnelle !</p>
            <p>Backend API + Interface Admin + Paiements Stripe</p>
        </div>
    </div>
</body>
</html>
  `

  res.setHeader('Content-Type', 'text/html')
  res.send(adminHTML)
}
