# Generated by Django 5.0.4 on 2024-04-23 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_post_car_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='contact_number',
            field=models.CharField(default=88374658, max_length=8),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='price',
            field=models.FloatField(default=23000000),
            preserve_default=False,
        ),
    ]