from django.urls import path
from . import views

urlpatterns = [
    path('create-payment-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('webhook/', views.StripeWebhookView.as_view(), name='stripe-webhook'),
]