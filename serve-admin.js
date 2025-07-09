const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 9000;

// Configuration CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Proxy pour toutes les routes API vers Render
app.use('/admin/auth', createProxyMiddleware({
  target: 'https://medusa-backend-simple-pio8.onrender.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} ${req.url} to Render`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

app.use('/admin/api', createProxyMiddleware({
  target: 'https://medusa-backend-simple-pio8.onrender.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug'
}));

app.use('/store', createProxyMiddleware({
  target: 'https://medusa-backend-simple-pio8.onrender.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug'
}));

// Servir les fichiers statiques de l'admin
app.use('/admin', express.static(path.join(__dirname, '.medusa/admin')));

// Rediriger vers l'admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Fallback pour les routes de l'admin (SPA)
app.get('/admin/*', (req, res) => {
  const filePath = path.join(__dirname, '.medusa/admin/index.html');
  if (require('fs').existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Admin build not found. Please run: npm run build:admin');
  }
});

app.listen(PORT, () => {
  console.log(`🎉 Admin Medusa disponible sur http://localhost:${PORT}/admin`);
  console.log(`🔗 Connecté à l'API: https://medusa-backend-simple-pio8.onrender.com`);
  console.log(`📁 Admin build path: ${path.join(__dirname, '.medusa/admin')}`);
});
