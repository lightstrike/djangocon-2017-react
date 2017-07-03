from django.urls import reverse
from model_mommy import mommy
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from talks.models import Talk


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
