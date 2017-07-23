from django.db import models


class Talk(models.Model):
    """
    Describes a talk where knowledge was shared.
    """
    title = models.CharField(max_length=128)
    youtube_url = models.URLField()
    speaker_name = models.CharField(max_length=128)
    date = models.DateField()
    description = models.TextField(max_length=2048)

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        verbose_name = 'talk'
        verbose_name_plural = 'talks'

    def __str__(self):
        return f'{self.title} | {self.speaker_name}'


class Vote(models.Model):
    """
    Records user votes about talks.
    In this case, upvote or downvote.
    """
    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name="user_votes"
    )
    talk = models.ForeignKey(
        'talks.Talk',
        on_delete=models.CASCADE,
        related_name="talk_votes"
    )
    vote = models.NullBooleanField()

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        verbose_name = 'vote'
        verbose_name_plural = 'vote'

    def __str__(self):
        return f'{self.user} | {self.talk} | {self.vote}'


class Comment(models.Model):
    """
    Comments users make about talks.
    """
    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name="user_comments"
    )
    talk = models.ForeignKey(
        'talks.Talk',
        on_delete=models.CASCADE,
        related_name="talk_comments"
    )
    content = models.TextField(max_length=2048)

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        verbose_name = 'comment'
        verbose_name_plural = 'comments'

    def __str__(self):
        return f'{self.user} comment on {self.talk} at {self.created}'
