from rest_framework import serializers
from .models import Category, Product, ProductImage
from django.utils.text import slugify

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        if not validated_data.get('slug'):
            validated_data['slug'] = slugify(validated_data['name'])
        if not validated_data.get('description'):
            validated_data['description'] = ''
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
    # Same auto‑generate for updates if needed
        if not validated_data.get('slug'):
            validated_data['slug'] = slugify(validated_data.get('name', instance.name))
        if not validated_data.get('description'):
            validated_data['description'] = ''
        return super().update(instance, validated_data)

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'image', 'parent', 'children')
    
    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')
    in_stock = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'description', 'price', 'compare_price',
                 'category', 'category_name', 'stock', 'in_stock', 'sku', 
                 'image', 'images', 'is_featured', 'created_at')
        extra_kwargs = {
            'slug': {'required': False, 'allow_blank': True},
            'description': {'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        if not validated_data.get('slug'):
            validated_data['slug'] = slugify(validated_data['name'])
        if not validated_data.get('description'):
            validated_data['description'] = ''
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if not validated_data.get('slug'):
            validated_data['slug'] = slugify(validated_data.get('name', instance.name))
        if not validated_data.get('description'):
            validated_data['description'] = ''
        return super().update(instance, validated_data)