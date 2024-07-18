from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Products, SubVariant
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=["post"])
    def add_stock(self, request, pk=None):
        product = self.get_object()
        variant_id = request.data.get("variant_id")
        option = request.data.get("option")
        quantity = request.data.get("quantity")

        if not variant_id or not option or not quantity:
            return Response(
                {"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            sub_variant = SubVariant.objects.get(variant__id=variant_id, option=option)
            sub_variant.stock += quantity
            sub_variant.save()
            product.TotalStock += quantity
            product.save()
            return Response({"status": "stock added"}, status=status.HTTP_200_OK)
        except SubVariant.DoesNotExist:
            return Response(
                {"error": "Variant or option not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=True, methods=["post"])
    def remove_stock(self, request, pk=None):
        product = self.get_object()
        variant_id = request.data.get("variant_id")
        option = request.data.get("option")
        quantity = request.data.get("quantity")

        if not variant_id or not option or not quantity:
            return Response(
                {"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            sub_variant = SubVariant.objects.get(variant__id=variant_id, option=option)
            if sub_variant.stock < quantity:
                return Response(
                    {"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST
                )

            sub_variant.stock -= quantity
            sub_variant.save()
            product.TotalStock -= quantity
            product.save()
            return Response({"status": "stock removed"}, status=status.HTTP_200_OK)
        except SubVariant.DoesNotExist:
            return Response(
                {"error": "Variant or option not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
