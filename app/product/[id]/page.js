import Header from "@/components/Header";
import OneProduct from "@/components/OneProduct";
import productDetails from "@/lib/productDetails";


export default async function ProductPage({product}) {


    const allProductData =  productDetails(product);
    const allUserProduct = await allProductData;
    // console.log(allUserProduct)
  
    return (
        <>
        <Header />
        <OneProduct products={allUserProduct} />
        </>
    )
}