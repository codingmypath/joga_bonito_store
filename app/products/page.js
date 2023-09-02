

import Header from "@/components/Header";
import AllProducts from "@/components/AllProducts";
import allProducts from "@/lib/allProducts";


//All products page should be like this like Homepage
export default async function AllProductsPage({all}) {
  // console.log({newProducts})
  // const productData =  products(product);
  // const userProduct = await productData;
  // console.log(userProduct)

  
//   const productData =  products(featuredProduct);
//   const userProduct = await productData;
//   console.log(userProduct)

  const allProductData =  allProducts(all);
  const allUserProduct = await allProductData;
  // console.log(allUserProduct)


  // const newProductData =  products(newProducts);
  // const newProduct = await newProductData;
  // console.log(newProduct)


  // const userData = products(product)
  // const [userProduct] = await Promise.all([userData])

  return (
    <div>
      <Header />
      <AllProducts all={allUserProduct} />
    </div>
  );
}
