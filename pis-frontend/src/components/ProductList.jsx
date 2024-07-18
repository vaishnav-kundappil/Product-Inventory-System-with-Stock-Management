import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>List of products in inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>HSN Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(prod => (
            <TableRow key={`product-${prod.ProductID}`}>
              <TableCell>{prod.ProductID}</TableCell>
              <TableCell>{prod.ProductCode}</TableCell>
              <TableCell>{prod.HSNCode}</TableCell>
              <TableCell className="font-medium">{prod.ProductName}</TableCell>
              <TableCell>{Math.round(prod.TotalStock)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
