from django.urls import path
from .views import ConversationListView, ChatView, ConversationDeleteView

urlpatterns = [
    # Liste + création
    path("conversations/", ConversationListView.as_view(), name="conversations"),

    # Envoi d'un message dans une conversation
    path("conversations/<int:conversation_id>/chat/", ChatView.as_view(), name="chat"),

    # Suppression d'une conversation
    path("conversations/<int:conversation_id>/", ConversationDeleteView.as_view(), name="conversation-delete"),
]