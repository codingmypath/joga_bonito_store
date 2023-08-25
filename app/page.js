
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "./models/Product";
import { mongooseConnect } from "../lib/mongoose";
import  products  from "@/lib/products";
import NewProducts from "@/components/NewProducts";


export default async function HomePage({featuredProduct}) {

  const productData =  products(featuredProduct);
  const userProduct = await productData;
  console.log(userProduct)


  return (
    <div>
      <Header />
      <Featured featuredProduct={userProduct} />
      <NewProducts newProducts={userProduct} />
    </div>
  );
}
