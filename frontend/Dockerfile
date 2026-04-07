# Image Node.js légère pour faire tourner React en développement
FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copie les fichiers de dépendances en premier
# Docker met en cache cette couche si package.json ne change pas
COPY package*.json ./

# Installe les dépendances si package.json existe, sinon continue
RUN if [ -f package.json ]; then npm install; fi

# Copie tout le reste du code
COPY . .

# Expose le port de développement Vite
EXPOSE 5173

# Lance le serveur de développement
# --host permet à Docker d'exposer le port à l'extérieur du container
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]