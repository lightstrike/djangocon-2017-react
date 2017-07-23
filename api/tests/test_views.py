from django.urls import reverse
from model_mommy import mommy
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from talks.models import Comment, Talk, Vote


class CommentViewSetTestCase(APITestCase):
    """
    Tests list, detail, create, update and delete endpoints for comments.
    """
    def setUp(self):
        self.talks = mommy.make(Talk, _quantity=2)
        self.users = mommy.make(User, _quantity=2)
        self.comments_set_1 = mommy.make(Comment,
                                         talk=self.talks[0],
                                         user=self.users[0],
                                         _quantity=3)
        self.comments_set_2 = mommy.make(Comment,
                                         talk=self.talks[1],
                                         user=self.users[0],
                                         _quantity=3)
        self.comments_set_3 = mommy.make(Comment,
                                         talk=self.talks[0],
                                         user=self.users[1],
                                         _quantity=3)
        self.comments_set_4 = mommy.make(Comment,
                                         talk=self.talks[1],
                                         user=self.users[1],
                                         _quantity=3)

    def test_getting_list_of_comments(self):
        """
        Tests that 200 is returned for list of comments.
        """
        endpoint = reverse('comment-list')
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 12

    def test_getting_filtered_list_of_comments(self):
        """
        Tests that 200 is returned with correct length for filtered list of comments.
        """
        endpoint = reverse('comment-list')
        response = self.client.get(endpoint, format='json', data={'talk': self.talks[1].id})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 6

    def test_creating_new_comment(self):
        """
        Tests that 201 is returned when creating a new comment.
        """
        comment_to_create = mommy.prepare(Comment, talk=self.talks[0], user=self.users[0])
        payload = {
            'talk': comment_to_create.talk_id,
            'user': comment_to_create.user_id,
            'content': comment_to_create.content,
        }
        endpoint = reverse('comment-list')
        response = self.client.post(endpoint, data=payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert comment_to_create.content == response.json().get('content')

    def test_getting_comment_detail(self):
        """
        Tests that 200 is returned for details on a specific comment (id == 1).
        """
        first_comment = Comment.objects.first()
        endpoint = reverse('comment-detail', args=(first_comment.id,))
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert first_comment.id == response.json().get('id')

    def test_updating_comment_with_put(self):
        """
        Tests that 200 is returned when updating a comment with PUT.
        """
        first_comment = Comment.objects.first()
        comment_update_values = mommy.prepare(Comment, talk=self.talks[0], user=self.users[0])
        payload = {
            'talk': comment_update_values.talk_id,
            'user': comment_update_values.user_id,
            'content': comment_update_values.content,
        }
        endpoint = reverse('comment-detail', args=(first_comment.id,))
        response = self.client.put(endpoint, data=payload)
        assert response.status_code == status.HTTP_200_OK
        assert comment_update_values.content == response.json().get('content')

    def test_updating_comment_with_patch(self):
        """
        Tests that 200 is returned when updating a comment with PATCH.
        """
        first_comment = Comment.objects.first()
        comment_update_values = {'content': 'Great reactions at DjangoCon!'}
        endpoint = reverse('comment-detail', args=(first_comment.id,))
        response = self.client.patch(endpoint, data=comment_update_values)
        assert response.status_code == status.HTTP_200_OK
        assert comment_update_values['content'] == response.json().get('content')

    def test_deleting_comment(self):
        """
        Tests that 204 is returned when deleting a comment.
        """
        first_comment = Comment.objects.first()
        endpoint = reverse('comment-detail', args=(first_comment.id,))
        response = self.client.delete(endpoint)
        assert response.status_code == status.HTTP_204_NO_CONTENT


class TalkViewSetTestCase(APITestCase):
    """
    Tests list, detail, create, update and delete endpoints for talks.
    """
    def setUp(self):
        self.talks = mommy.make(Talk, _quantity=3)

    def test_getting_list_of_talks(self):
        """
        Tests that 200 is returned for list of talks.
        """
        endpoint = reverse('talk-list')
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 3

    def test_creating_new_talk(self):
        """
        Tests that 201 is returned when creating a new talk.
        """
        talk_to_create = mommy.prepare(Talk)
        endpoint = reverse('talk-list')
        response = self.client.post(endpoint, data=talk_to_create.__dict__)
        assert response.status_code == status.HTTP_201_CREATED
        assert talk_to_create.title == response.json().get('title')

    def test_getting_talk_detail(self):
        """
        Tests that 200 is returned for details on a specific talk (id == 1).
        """
        first_talk = Talk.objects.first()
        endpoint = reverse('talk-detail', args=(first_talk.id,))
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert first_talk.id == response.json().get('id')

    def test_updating_talk_with_put(self):
        """
        Tests that 200 is returned when updating a talk with PUT.
        """
        first_talk = Talk.objects.first()
        talk_update_values = mommy.prepare(Talk)
        endpoint = reverse('talk-detail', args=(first_talk.id,))
        response = self.client.put(endpoint, data=talk_update_values.__dict__)
        assert response.status_code == status.HTTP_200_OK
        assert talk_update_values.title == response.json().get('title')

    def test_updating_talk_with_patch(self):
        """
        Tests that 200 is returned when updating a talk with PATCH.
        """
        first_talk = Talk.objects.first()
        talk_update_values = {'title': 'Reacting at DjangoCon', 'description': 'Spokane rocks!'}
        endpoint = reverse('talk-detail', args=(first_talk.id,))
        response = self.client.patch(endpoint, data=talk_update_values)
        assert response.status_code == status.HTTP_200_OK
        assert talk_update_values['title'] == response.json().get('title')

    def test_deleting_talk(self):
        """
        Tests that 204 is returned when deleting a talk.
        """
        first_talk = Talk.objects.first()
        endpoint = reverse('talk-detail', args=(first_talk.id,))
        response = self.client.delete(endpoint)
        assert response.status_code == status.HTTP_204_NO_CONTENT


class UserViewSetTestCase(APITestCase):
    """
    Tests list, detail, create, update and delete endpoints for users.
    """
    def setUp(self):
        self.users = mommy.make(User, _quantity=3)

    def test_getting_list_of_users(self):
        """
        Tests that 200 is returned for list of users.
        """
        endpoint = reverse('user-list')
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 3

    def test_creating_new_user(self):
        """
        Tests that 201 is returned when creating a new user.
        """
        user_to_create = mommy.prepare(User)
        endpoint = reverse('user-list')
        response = self.client.post(endpoint, data=user_to_create.__dict__)
        assert response.status_code == status.HTTP_201_CREATED
        assert user_to_create.email == response.json().get('email')

    def test_getting_user_detail(self):
        """
        Tests that 200 is returned for details on a specific user (id == 1).
        """
        first_user = User.objects.first()
        endpoint = reverse('user-detail', args=(first_user.id,))
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert first_user.id == response.json().get('id')

    def test_updating_user_with_put(self):
        """
        Tests that 200 is returned when updating a user with PUT.
        """
        first_user = User.objects.first()
        user_update_values = mommy.prepare(User)
        endpoint = reverse('user-detail', args=(first_user.id,))
        response = self.client.put(endpoint, data=user_update_values.__dict__)
        assert response.status_code == status.HTTP_200_OK
        assert user_update_values.email == response.json().get('email')

    def test_updating_user_with_patch(self):
        """
        Tests that 200 is returned when updating a user with PATCH.
        """
        first_user = User.objects.first()
        user_update_values = {'email': 'react@djangocon.us', 'first_name': 'Spokane'}
        endpoint = reverse('user-detail', args=(first_user.id,))
        response = self.client.patch(endpoint, data=user_update_values)
        assert response.status_code == status.HTTP_200_OK
        assert user_update_values['email'] == response.json().get('email')

    def test_deleting_user(self):
        """
        Tests that 204 is returned when deleting a user.
        """
        first_user = User.objects.first()
        endpoint = reverse('user-detail', args=(first_user.id,))
        response = self.client.delete(endpoint)
        assert response.status_code == status.HTTP_204_NO_CONTENT


class VoteViewSetTestCase(APITestCase):
    """
    Tests list, detail, create, update and delete endpoints for votes.
    """
    def setUp(self):
        self.talks = mommy.make(Talk, _quantity=2)
        self.users = mommy.make(User, _quantity=2)
        self.votes_set_1 = mommy.make(Vote,
                                      talk=self.talks[0],
                                      user=self.users[0],
                                      _quantity=3)
        self.votes_set_2 = mommy.make(Vote,
                                      talk=self.talks[1],
                                      user=self.users[0],
                                      _quantity=3)
        self.votes_set_3 = mommy.make(Vote,
                                      talk=self.talks[0],
                                      user=self.users[1],
                                      _quantity=3)
        self.votes_set_4 = mommy.make(Vote,
                                      talk=self.talks[1],
                                      user=self.users[1],
                                      _quantity=3)

    def test_getting_list_of_votes(self):
        """
        Tests that 200 is returned for list of votes.
        """
        endpoint = reverse('vote-list')
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 12

    def test_getting_filtered_list_of_votes(self):
        """
        Tests that 200 is returned with correct length for filtered list of votes.
        """
        endpoint = reverse('vote-list')
        response = self.client.get(endpoint, format='json', data={'talk': self.talks[1].id})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 6

    def test_creating_new_vote(self):
        """
        Tests that 201 is returned when creating a new vote.
        """
        vote_to_create = mommy.prepare(Vote, talk=self.talks[0], user=self.users[0], vote=True)
        payload = {
            'talk': vote_to_create.talk_id,
            'user': vote_to_create.user_id,
            'vote': vote_to_create.vote,
        }
        endpoint = reverse('vote-list')
        response = self.client.post(endpoint, data=payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert vote_to_create.vote == response.json().get('vote')

    def test_getting_vote_detail(self):
        """
        Tests that 200 is returned for details on a specific vote (id == 1).
        """
        first_vote = Vote.objects.first()
        endpoint = reverse('vote-detail', args=(first_vote.id,))
        response = self.client.get(endpoint, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert first_vote.id == response.json().get('id')

    def test_updating_vote_with_put(self):
        """
        Tests that 200 is returned when updating a vote with PUT.
        """
        first_vote = Vote.objects.first()
        vote_update_values = mommy.prepare(Vote, talk=self.talks[0], user=self.users[0], vote=False)
        payload = {
            'talk': vote_update_values.talk_id,
            'user': vote_update_values.user_id,
            'vote': vote_update_values.vote,
        }
        endpoint = reverse('vote-detail', args=(first_vote.id,))
        response = self.client.put(endpoint, data=payload)
        assert response.status_code == status.HTTP_200_OK
        assert vote_update_values.vote == response.json().get('vote')

    def test_updating_vote_with_patch(self):
        """
        Tests that 200 is returned when updating a vote with PATCH.
        """
        first_vote = Vote.objects.first()
        vote_update_values = {'vote': False}
        endpoint = reverse('vote-detail', args=(first_vote.id,))
        response = self.client.patch(endpoint, data=vote_update_values)
        assert response.status_code == status.HTTP_200_OK
        assert vote_update_values['vote'] == response.json().get('vote')

    def test_deleting_vote(self):
        """
        Tests that 204 is returned when deleting a vote.
        """
        first_vote = Vote.objects.first()
        endpoint = reverse('vote-detail', args=(first_vote.id,))
        response = self.client.delete(endpoint)
        assert response.status_code == status.HTTP_204_NO_CONTENT
