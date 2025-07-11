from django.contrib import admin
from cart.models import Order
from django.urls import path
from django.template.response import TemplateResponse

class MarketPeakAdminSite(admin.AdminSite):
    site_header = 'MarketPeak Admin'
    site_title = 'MarketPeak Admin Portal'
    index_title = 'Welcome to MarketPeak Admin'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard_view), name='dashboard'),
        ]
        return custom_urls + urls

    def dashboard_view(self, request):
        total_orders = Order.objects.count()
        total_sales = Order.objects.filter(status='completed').aggregate(total=admin.models.Sum('total'))['total'] or 0
        pending_orders = Order.objects.filter(status='pending').count()
        shipped_orders = Order.objects.filter(status='shipped').count()
        completed_orders = Order.objects.filter(status='completed').count()
        context = dict(
            self.each_context(request),
            total_orders=total_orders,
            total_sales=total_sales,
            pending_orders=pending_orders,
            shipped_orders=shipped_orders,
            completed_orders=completed_orders,
        )
        return TemplateResponse(request, 'admin/dashboard.html', context)

admin_site = MarketPeakAdminSite() 