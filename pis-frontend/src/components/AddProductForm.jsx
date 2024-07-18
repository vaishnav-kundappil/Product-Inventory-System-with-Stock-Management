import React, { useState } from 'react';
import axios from 'axios';
import Input from './ui/Input';
import Button from './ui/Button';

const ProductForm = () => {
  const [product, setProduct] = useState({ ProductID: '', ProductCode: '', ProductName: '', HSNCode: '', TotalStock: 0 });
  const [variants, setVariants] = useState([{ name: '', sub_variants: [{ option: '', stock: 0 }] }]);

  const handleAddVariant = () => {
    setVariants([...variants, { name: '', sub_variants: [{ option: '', stock: 0 }] }]);
  };

  const handleVariantChange = (index, event) => {
    const newVariants = variants.slice();
    newVariants[index][event.target.name] = event.target.value;
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex, optionIndex, option, stock) => {
    const newVariants = variants.slice();
    newVariants[variantIndex].sub_variants[optionIndex] = { option, stock };
    setVariants(newVariants);
  };

  const handleAddOption = (variantIndex) => {
    const newVariants = variants.slice();
    newVariants[variantIndex].sub_variants.push('');
    setVariants(newVariants);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Product:::", product, variants)
    try {
      const response = await axios.post('http://localhost:8000/api/products/', {
        ...product,
        variants: variants,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='my-4'>
        <label>Product ID</label>
        <Input
          type="text"
          value={product.ProductID}
          onChange={(e) => setProduct(prev => ({ ...prev, ProductID: e.target.value }))}
        />
      </div>
      <div className='flex gap-2 justify-between'>
        <div className='my-4'>
          <label>Product Code</label>
          <Input
            type="text"
            value={product.ProductCode}
            onChange={(e) => setProduct(prev => ({ ...prev, ProductCode: e.target.value }))}
          />
        </div>
        <div className='my-4'>
          <label>HSN Code</label>
          <Input
            type="text"
            value={product.HSNCode}
            onChange={(e) => setProduct(prev => ({ ...prev, HSNCode: e.target.value }))}
          />
        </div>

      </div>

      <div className='my-4'>
        <label>Product Name</label>
        <Input
          type="text"
          value={product.ProductName}
          onChange={(e) => setProduct(prev => ({ ...prev, ProductName: e.target.value }))}
        />
      </div>
      <h4 className='text-lg font-medium'>Variants</h4>
      {variants.map((variant, variantIndex) => (
        <div key={variantIndex} className='border rounded-lg p-3 mb-4'>
          <label>Variant Name</label>
          <Input
            type="text"
            name="name"
            value={variant.name}
            onChange={(e) => handleVariantChange(variantIndex, e)}
          />
          <div className='space-y-4 mt-4 mb-2 p-3 border rounded-md'>
            {variant.sub_variants.map((option, optionIndex) => (
              <div key={optionIndex} className='gap-2 flex'>
                <div>
                  <label>Option {optionIndex + 1}</label>
                  <Input
                    type="text"
                    value={option.option}
                    onChange={(e) =>
                      handleOptionChange(variantIndex, optionIndex, e.target.value, option.stock)
                    }
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <Input
                    type="number"
                    value={option.stock}
                    onChange={(e) =>
                      handleOptionChange(variantIndex, optionIndex, option.option, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" type="button" onClick={() => handleAddOption(variantIndex)} className="w-full mt-4">
            Add Option
          </Button>
        </div>
      ))}
      <div className='flex justify-end mb-4'>
        <Button variant="outline" type="button" onClick={handleAddVariant}>
          Add Variant
        </Button>
      </div>

      <div className='mb-4'>
        <label>Total Stock</label>
        <Input
          type="number"
          value={product.TotalStock}
          onChange={(e) =>
            setProduct(prev => ({
              ...prev, TotalStock: e.target.value
            }))
          }
        />
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
};

export default ProductForm;
