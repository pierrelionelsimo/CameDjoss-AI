from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Message
from .serializers import ConversationSerializer
from .ai_client import get_ai_response


class ConversationListView(APIView):
    """
    Gère la liste des conversations.
    GET  /api/conversations/ → retourne toutes les conversations
    POST /api/conversations/ → crée une nouvelle conversation vide
    """

    def get(self, request):
        # Récupère toutes les conversations (déjà triées par date desc grâce au Meta)
        conversations = Conversation.objects.all()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Crée une nouvelle conversation sans titre ni messages
        conversation = Conversation.objects.create()
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChatView(APIView):
    """
    Gère l'envoi d'un message et la réponse de l'IA.
    POST /api/conversations/<id>/chat/
    Body attendu : { "message": "Ton texte ici" }
    """

    def post(self, request, conversation_id):

        # 1. Vérifier que la conversation existe
        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except Conversation.DoesNotExist:
            return Response(
                {"error": "Conversation introuvable"},
                status=status.HTTP_404_NOT_FOUND
            )

        # 2. Récupérer et valider le message envoyé par l'utilisateur
        user_message = request.data.get("message", "").strip()
        if not user_message:
            return Response(
                {"error": "Le message ne peut pas être vide"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Sauvegarder le message de l'utilisateur en base de données
        Message.objects.create(
            conversation=conversation,
            role="user",
            content=user_message
        )

        # 4. Récupérer tous les messages pour donner le contexte à Gemini
        all_messages = conversation.messages.all()

        # 5. Appeler Gemini et obtenir la réponse
        ai_response = get_ai_response(all_messages)

        # 6. Sauvegarder la réponse de l'IA en base de données
        Message.objects.create(
            conversation=conversation,
            role="assistant",
            content=ai_response
        )

        # 7. Mettre à jour le titre avec les 50 premiers caractères du 1er message
        if conversation.title == "Nouvelle conversation":
            conversation.title = user_message[:50]
            conversation.save()

        # 8. Retourner la réponse au frontend
        return Response({
            "response": ai_response,
            "conversation_id": conversation.id,
            "title": conversation.title
        }, status=status.HTTP_200_OK)
    
    
class ConversationDeleteView(APIView):

    def delete(self, request, conversation_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id)
            conversation.delete()
            # Retourne explicitement un JSON 200
            return Response(
                {"message": "Conversation supprimée"},
                status=status.HTTP_200_OK
            )
        except Conversation.DoesNotExist:
            return Response(
                {"error": "Conversation introuvable"},
                status=status.HTTP_404_NOT_FOUND
            )