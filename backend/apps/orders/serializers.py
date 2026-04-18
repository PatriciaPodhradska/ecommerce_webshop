from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductSerializer
from apps.accounts.serializers import AddressSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'price', 'subtotal')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = AddressSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'order_number', 'status', 'subtotal', 'shipping_cost', 
                 'tax', 'total', 'shipping_address', 'notes', 'items', 'created_at')

class CreateOrderSerializer(serializers.Serializer):
    address_id = serializers.IntegerField()
    notes = serializers.CharField(required=False, allow_blank=True)
    
    def validate_address_id(self, value):
        from apps.accounts.models import Address
        try:
            address = Address.objects.get(id=value, user=self.context['request'].user)
            return address
        except Address.DoesNotExist:
            raise serializers.ValidationError("Address not found")
    
    def save(self, **kwargs):
        user = kwargs['user']
        cart = kwargs['cart']
        address = self.validated_data['address_id']
        notes = self.validated_data.get('notes', '')
        
        subtotal = cart.subtotal
        shipping_cost = 0  # Calculate based on address
        tax = subtotal * 0.1  # 10% tax
        total = subtotal + shipping_cost + tax
        
        import uuid
        order = Order.objects.create(
            user=user,
            order_number=uuid.uuid4().hex[:10].upper(),
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax=tax,
            total=total,
            shipping_address=address,
            notes=notes
        )
        
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            
            # Update product stock
            product = cart_item.product
            product.stock -= cart_item.quantity
            product.save()
        
        return order