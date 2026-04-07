from django.db import models


class Conversation(models.Model):
    """
    Représente une session de chat complète.
    Chaque conversation contient plusieurs messages.
    """
    # Titre généré automatiquement à partir du premier message
    title = models.CharField(max_length=255, default="Nouvelle conversation")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        # Les conversations les plus récentes apparaissent en premier
        ordering = ["-created_at"]


class Message(models.Model):
    """
    Représente un seul message dans une conversation.
    Peut être envoyé par l'utilisateur ou par l'IA.
    """
    ROLE_CHOICES = [
        ("user", "Utilisateur"),
        ("assistant", "Assistant"),
    ]

    # Lien vers la conversation parente
    # Si la conversation est supprimée, tous ses messages le sont aussi (CASCADE)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"  # permet d'accéder aux messages via conversation.messages
    )

    # Qui a envoyé ce message : l'utilisateur ou l'IA
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    # Le contenu du message (TextField = texte long sans limite)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role} : {self.content[:50]}"

    class Meta:
        # Les messages sont affichés dans l'ordre chronologique
        ordering = ["created_at"]