# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-06 18:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('talks', '0002_add_comments'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-id'], 'verbose_name': 'comment', 'verbose_name_plural': 'comments'},
        ),
    ]
