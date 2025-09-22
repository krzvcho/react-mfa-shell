// remote - vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_app_datarouter',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@mui/material',
        '@mui/icons-material',
        '@mui/x-data-grid',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  },
});
