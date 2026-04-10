from pathlib import Path
from dotenv import load_dotenv
import os

import dj_database_url

# Charge les variables du fichier .env

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Clé secrète Django — lue depuis .env pour ne pas l'exposer sur GitHub
SECRET_KEY = os.getenv("SECRET_KEY")

# En développement DEBUG=True affiche les erreurs détaillées
DEBUG = os.getenv("DEBUG", "False") == "True"

# Domaines autorisés à accéder à l'application
# Autorise localhost, 127.0.0.1 et "backend" (nom du service Docker)
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "backend", "*", " :.onrender.com"]

# Applications installées dans le projet
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",    # Pour créer des APIs REST facilement
    "corsheaders",       # Pour autoriser le frontend React à appeler le backend
    "chatbot",           # Notre application
]

MIDDLEWARE = [
    # CorsMiddleware DOIT être en premier pour intercepter les requêtes cross-origin
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# ── Base de données ──────────────────────────────────────────────────────────
# En production sur Render, DATABASE_URL est fourni automatiquement
# En local, on utilise les variables individuelles du .env
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Production : Render fournit une URL complète PostgreSQL
    DATABASES = {
        "default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)
    }
else:
    # Local : on utilise les variables du .env
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
            "HOST": os.getenv("POSTGRES_HOST", "db"),
            "PORT": os.getenv("POSTGRES_PORT", "5432"),
        }
    }

# ── Fichiers statiques (Whitenoise) ──────────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://camedjoss-ai.vercel.app",
]

# Autorise toutes les origines en dev uniquement
CORS_ALLOW_ALL_ORIGINS = os.getenv("DEBUG", "False") == "True"


# Langue et fuseau horaire adaptés au Cameroun
LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "Africa/Douala"
USE_I18N = True
USE_TZ = True


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configuration de Django REST Framework
REST_FRAMEWORK = {
    # Retourne du JSON par défaut (pas de l'HTML)
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

from pathlib import Path
from dotenv import load_dotenv
import os
import dj_database_url

load_dotenv()