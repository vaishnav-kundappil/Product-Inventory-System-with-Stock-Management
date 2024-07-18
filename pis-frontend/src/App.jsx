import AddProduct from "./components/AddProduct.jsx"
import ProductList from "./components/ProductList.jsx"
import Button from "./components/ui/Button.jsx"

function App() {
  return (
    <div className='max-w-5xl mx-auto p-5'>
      <div className='flex mb-8 justify-between'>
        <h3 className='text-2xl font-bold'>Product Inventory Mangement System</h3>
        <AddProduct />

      </div>

      <ProductList />
    </div>
  )
}

export default App
