import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
    title: "Cart Page",
    description: "This is the cart page",
}

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {

    const productsInCart: ProductInCart[] = [];

    for( const id of Object.keys(cart) ) {
        const product = products.find( product => product.id === id );
        if( product ) {
            productsInCart.push({ product, quantity: cart[id] });
        }
    }

    return productsInCart;
} 

export default async function CartPage() {


    const cookiesStore = await cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number };

    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce( ( prev, current ) => prev + current.product.price * current.quantity + prev, 0 );

  return (
    <div>
      <h1>Cart Page</h1>
      <hr className="my-4" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex-col gap-2 w-full sm:w-8/12">
        
            {
                productsInCart.map( ({ product, quantity }) => (
                    <ItemCard key={product.id} product={product} quantity={quantity} />
                ))
            }

        </div>

        <div className="flex flex-col  w-full sm:w-4/12">
            <WidgetItem>
                <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">${ (totalToPay * 1.15).toFixed(2) }</h3>
                </div>
                <span className="font-bold text-center text-gray-500">Tax 15%: ${ (totalToPay * 0.15).toFixed(2)} </span>
            </WidgetItem>
        </div>
      </div>
    </div>
  );
}