#!/usr/bin/env bash
# Script de build exécuté par Render à chaque déploiement

# Installe les dépendances
pip install -r requirements.txt

# Applique les migrations automatiquement
python manage.py migrate

# Collecte les fichiers statiques
python manage.py collectstatic --no-input