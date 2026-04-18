from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.products.models import Category, Product
from decimal import Decimal

User = get_user_model()

class Command(BaseCommand):
    help = 'Create test data for development'
    
    def handle(self, *args, **options):
        # Create categories
        electronics = Category.objects.create(name='Electronics', slug='electronics')
        clothing = Category.objects.create(name='Clothing', slug='clothing')
        
        # Create products
        Product.objects.create(
            name='Laptop',
            slug='laptop',
            description='High-performance laptop',
            price=Decimal('999.99'),
            category=electronics,
            stock=10,
            sku='LAP001'
        )
        
        Product.objects.create(
            name='T-Shirt',
            slug='t-shirt',
            description='Cotton t-shirt',
            price=Decimal('19.99'),
            category=clothing,
            stock=50,
            sku='TSH001'
        )
        
        self.stdout.write(self.style.SUCCESS('Test data created successfully'))