// proxy.conf.js
export default [
  {
    context: ['/api'], // <--- ¡IMPORTANTE! Solo "/api", NUNCA pongas "/"
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug', // Esto nos ayudará a ver en la terminal qué pasa
  },
];
