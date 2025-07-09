import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV === 'production' ? {
      ssl: { rejectUnauthorized: false },
      connection: {
        ssl: { rejectUnauthorized: false }
      }
    } : {},
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,https://bigtest-storefront.vercel.app",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:7001,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    enable: true,
    path: "/admin"
  },
  modules: [
    {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY || "sk_test_dummy",
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "whsec_dummy",
            },
          },
        ],
      },
    },
  ],
})
