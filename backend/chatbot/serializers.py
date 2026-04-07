from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Convertit un objet Message en JSON.
    Exemple de sortie :
    {
        "id": 1,
        "role": "user",
        "content": "Bonjour !",
        "created_at": "2026-04-04T10:00:00Z"
    }
    """
    class Meta:
        model = Message
        fields = ["id", "role", "content", "created_at"]


class ConversationSerializer(serializers.ModelSerializer):
    """
    Convertit une Conversation en JSON, avec tous ses messages imbriqués.
    read_only=True car on ne crée pas de messages via ce serializer directement.
    """
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "title", "created_at", "messages"]