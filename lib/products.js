import { mongooseConnect } from "./mongoose";
import { Product } from "@/app/models/Product";


// export default async function products() {
//     await mongooseConnect();
//     console.log("ENTER")
//     const featuredProductId = '64d755815b1279be5e769d8f';
//     const product = await Product.findById(featuredProductId)
    
//     return {
//       product: JSON.parse(JSON.stringify(product))
//     }
// }


export default async function products() {
  await mongooseConnect();
  console.log("ENTER")
  const featuredProductId = '64d755815b1279be5e769d8f';
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit: 10});
  return {
    
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    
  }
}
