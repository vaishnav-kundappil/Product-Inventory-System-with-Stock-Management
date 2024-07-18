from rest_framework import serializers
from .models import Products, Variant, SubVariant


class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ["id", "option", "stock"]


class VariantSerializer(serializers.ModelSerializer):
    sub_variants = SubVariantSerializer(many=True)

    class Meta:
        model = Variant
        fields = ["id", "name", "sub_variants"]


class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True)

    class Meta:
        model = Products
        fields = [
            "id",
            "ProductID",
            "ProductCode",
            "ProductName",
            "ProductImage",
            "CreatedDate",
            "UpdatedDate",
#             "CreatedUser",
            "IsFavourite",
            "Active",
            "HSNCode",
            "TotalStock",
            "variants",
        ]

    def create(self, validated_data):
        variants_data = validated_data.pop("variants")
        product = Products.objects.create(**validated_data)
        for variant_data in variants_data:
            sub_variants_data = variant_data.pop("sub_variants")
            variant = Variant.objects.create(product=product, **variant_data)
            for sub_variant_data in sub_variants_data:
                SubVariant.objects.create(variant=variant, **sub_variant_data)
        return product
