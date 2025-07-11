from django.core.management.base import BaseCommand
from products.models import Category, Product

class Command(BaseCommand):
    help = 'Populate database with sample products and categories'

    def handle(self, *args, **options):
        # Create categories
        electronics = Category.objects.create(
            name='Electronics',
            description='Electronic devices and gadgets'
        )
        
        clothing = Category.objects.create(
            name='Clothing',
            description='Fashion and apparel'
        )
        
        books = Category.objects.create(
            name='Books',
            description='Books and literature'
        )

        # Create products
        Product.objects.create(
            name='iPhone 15 Pro',
            description='Latest iPhone with advanced features',
            price=999.99,
            stock=50,
            category=electronics
        )

        Product.objects.create(
            name='Samsung Galaxy S24',
            description='Premium Android smartphone',
            price=899.99,
            stock=30,
            category=electronics
        )

        Product.objects.create(
            name='MacBook Air M2',
            description='Lightweight laptop with M2 chip',
            price=1199.99,
            stock=25,
            category=electronics
        )

        Product.objects.create(
            name='Nike Air Max',
            description='Comfortable running shoes',
            price=129.99,
            stock=100,
            category=clothing
        )

        Product.objects.create(
            name='Adidas T-Shirt',
            description='Comfortable cotton t-shirt',
            price=29.99,
            stock=200,
            category=clothing
        )

        Product.objects.create(
            name='The Great Gatsby',
            description='Classic American novel by F. Scott Fitzgerald',
            price=12.99,
            stock=150,
            category=books
        )

        Product.objects.create(
            name='Python Programming Guide',
            description='Complete guide to Python programming',
            price=39.99,
            stock=75,
            category=books
        )

        self.stdout.write(
            self.style.SUCCESS('Successfully created sample data')
        ) 