import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog"
import ProductForm from "./AddProductForm"
import Button from "./ui/Button"

export default function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a product to inventory by entering its details
          </DialogDescription>

          <ProductForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
