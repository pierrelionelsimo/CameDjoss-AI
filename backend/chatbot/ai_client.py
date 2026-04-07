from groq import Groq
import os

# Initialise le client Groq avec la clé API depuis le .env
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Modèle utilisé — llama-3.3-70b est puissant et gratuit sur Groq
MODEL = "llama-3.3-70b-versatile"

# Message système — définit le comportement de l'assistant
SYSTEM_PROMPT = {
    "role": "system",
    "content": (
        "Tu es un assistant IA généraliste, serviable et précis. "
        "Tu réponds toujours en français sauf si l'utilisateur écrit "
        "dans une autre langue. Sois concis mais complet."
    )
}


def build_messages(messages_queryset):
    """
    Convertit les messages Django en format attendu par Groq.
    Groq attend une liste de dicts avec 'role' et 'content'.

    Paramètres:
        messages_queryset : QuerySet de tous les messages de la conversation

    Retourne:
        list : Liste de messages au format Groq
    """
    # On commence toujours par le message système
    messages = [SYSTEM_PROMPT]

    # On ajoute tous les messages de la conversation
    for msg in messages_queryset:
        messages.append({
            # Groq utilise "assistant" (pas "model" comme Gemini)
            "role": msg.role,
            "content": msg.content
        })

    return messages


def get_ai_response(messages_queryset):
    """
    Envoie les messages à Groq et retourne la réponse de l'IA.

    Paramètres:
        messages_queryset : QuerySet de tous les messages de la conversation

    Retourne:
        str : La réponse textuelle de l'IA
    """
    try:
        # Construit la liste de messages avec l'historique complet
        messages = build_messages(messages_queryset)

        # Envoie la requête à Groq
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            # Limite la longueur de la réponse
            max_tokens=1024,
            # Contrôle la créativité (0=précis, 1=créatif)
            temperature=0.7,
        )

        # Extrait le texte de la réponse
        return response.choices[0].message.content

    except Exception as e:
        return f"Erreur lors de la communication avec l'IA : {str(e)}"