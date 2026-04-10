# CameDjoss AI 🤖

> Assistant IA conversationnel généraliste — propulsé par LLaMA 3.3-70b via Groq

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-came--djoss--ai.vercel.app-black?style=for-the-badge)](https://came-djoss-ai.vercel.app)
[![Backend](https://img.shields.io/badge/⚙️_Backend-Render-46E3B7?style=for-the-badge)](https://camedjoss-backend.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django)](https://djangoproject.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

---

## 📸 Aperçu

![CameDjoss AI Interface](https://came-djoss-ai.vercel.app/preview.png)

CameDjoss est une application web de chatbot IA full-stack avec une interface moderne dark mode inspirée de Claude AI. Les utilisateurs peuvent créer des conversations, poser des questions à l'IA et consulter leur historique.

---

## ✨ Fonctionnalités

- 💬 **Chat en temps réel** avec un assistant IA généraliste
- 🗂 **Historique des conversations** — sauvegardé en base de données
- 🗑 **Suppression des conversations** — au hover sur la sidebar
- 💡 **Suggestions rapides** sur l'écran d'accueil
- 🌙 **Interface dark mode** premium inspirée de Claude AI
- 📱 **Responsive** — adapté mobile et desktop
- ⚡ **LLaMA 3.3-70b** via Groq — réponses rapides et précises

---

## 🛠 Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + Vite + TailwindCSS |
| Backend | Django 5 + Django REST Framework |
| Base de données | PostgreSQL 15 |
| IA | LLaMA 3.3-70b via Groq API |
| Conteneurisation | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| Hébergement Frontend | Vercel |
| Hébergement Backend | Render |

---

## 🏗 Architecture

```
┌─────────────────┐         ┌──────────────────────┐
│   Vercel        │         │   Render             │
│   (Frontend)    │──────── │   (Backend)          │
│   React + Vite  │  API    │   Django + Gunicorn  │
└─────────────────┘         └──────────┬───────────┘
                                       │
                            ┌──────────▼───────────┐
                            │   PostgreSQL          │
                            │   (Render DB)         │
                            └──────────────────────┘
                                       │
                            ┌──────────▼───────────┐
                            │   Groq API            │
                            │   LLaMA 3.3-70b       │
                            └──────────────────────┘
```

---

## 🚀 Lancer le projet en local

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installé et lancé
- Une clé API Groq gratuite — [console.groq.com](https://console.groq.com)

### Installation

**1. Clone le repo**
```bash
git clone https://github.com/pierrelionelsimo/CameDjoss-AI.git
cd CameDjoss-AI/chatbot-ai
```

**2. Configure les variables d'environnement**
```bash
# Copie le fichier exemple
cp .env.example .env

# Édite .env et remplis tes valeurs
GROQ_API_KEY=ta_clé_groq
SECRET_KEY=une_clé_secrète_longue
POSTGRES_DB=chatbot_db
POSTGRES_USER=chatbot_user
POSTGRES_PASSWORD=ton_mot_de_passe
```

**3. Lance avec Docker**
```bash
docker-compose up --build
```

**4. Applique les migrations**
```bash
docker-compose exec backend python manage.py migrate
```

**5. Ouvre l'application**

- Frontend : [http://localhost:5173](http://localhost:5173)
- Backend API : [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/conversations/` | Liste toutes les conversations |
| `POST` | `/api/conversations/` | Crée une nouvelle conversation |
| `POST` | `/api/conversations/:id/chat/` | Envoie un message et reçoit la réponse IA |
| `DELETE` | `/api/conversations/:id/` | Supprime une conversation |

---

## 📁 Structure du projet

```
chatbot-ai/
├── backend/                  # API Django
│   ├── chatbot/
│   │   ├── models.py         # Modèles Conversation & Message
│   │   ├── views.py          # Vues API REST
│   │   ├── serializers.py    # Sérialisation JSON
│   │   ├── urls.py           # Routes API
│   │   └── ai_client.py      # Client Groq / LLaMA
│   ├── core/
│   │   └── settings.py       # Configuration Django
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/       # Composants UI
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── InputBar.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── hooks/
│   │   │   └── useChat.js    # Logique métier du chat
│   │   ├── services/
│   │   │   └── api.js        # Appels API backend
│   │   └── App.jsx
│   ├── vercel.json           # Configuration déploiement Vercel
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## 🔐 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `GROQ_API_KEY` | Clé API Groq (gratuite) | `gsk_...` |
| `SECRET_KEY` | Clé secrète Django | Chaîne aléatoire longue |
| `DEBUG` | Mode debug | `True` en dev, `False` en prod |
| `POSTGRES_DB` | Nom de la base de données | `chatbot_db` |
| `POSTGRES_USER` | Utilisateur PostgreSQL | `chatbot_user` |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL | `...` |
| `DATABASE_URL` | URL complète DB (Render) | `postgresql://...` |

---

## 👨‍💻 Auteur

**Simo  Lionel**
Étudiant Master Informatique — Université de Douala

[![Email](https://img.shields.io/badge/Email-pierrelionelsimo@gmail.com-red?style=flat-square&logo=gmail)](mailto:pierrelionelsimo@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-pierrelionelsimo-black?style=flat-square&logo=github)](https://github.com/pierrelionelsimo)


---

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation et de modification.
