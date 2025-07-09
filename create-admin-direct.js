const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function createAdmin() {
  const client = new Client({
    connectionString: 'postgresql://medusa_user:medusa_password@dpg-ctqhqhbtq21c73a8ej30-a.oregon-postgres.render.com/medusa_db?sslmode=require'
  });

  try {
    await client.connect();
    console.log('✅ Connecté à la base de données');

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('!Onyarrivera1', 10);

    // Insérer l'utilisateur admin
    const insertQuery = `
      INSERT INTO "user" (id, email, password_hash, first_name, last_name, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `;

    const result = await client.query(insertQuery, [
      'inoussa.bance91@gmail.com',
      hashedPassword,
      'Inoussa',
      'Bance'
    ]);

    if (result.rows.length > 0) {
      console.log('✅ Utilisateur admin créé avec succès !');
      console.log('📧 Email: inoussa.bance91@gmail.com');
      console.log('🔑 Mot de passe: !Onyarrivera1');
      console.log('👤 ID:', result.rows[0].id);
    } else {
      console.log('ℹ️ L\'utilisateur existe déjà');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await client.end();
  }
}

createAdmin();
