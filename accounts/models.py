from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils.functional import cached_property


class UserManager(BaseUserManager):
    """
    This class inherits from ``BaseUserManager`` --
    necessary because we are using a custom user model.
    """

    use_in_migrations = True

    def _create_user(self, email, password, is_staff,
                     is_superuser, **extra_fields):
        if not email:
            raise ValueError('Email must be set.')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff, is_active=True,
            is_superuser=is_superuser,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        return self._create_user(email, password, False, False,
                                 **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True,
                                 **extra_fields)


class User(PermissionsMixin, AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = '{user.first_name} {user.last_name}'.format(user=self)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def get_absolute_url(self):
        raise NotImplementedError

    def in_group(self, group_name):
        return group_name in self.groups.values_list('name', flat=True)
