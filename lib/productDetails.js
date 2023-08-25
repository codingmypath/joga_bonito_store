import { useSearchParams } from "next/navigation";
import { mongooseConnect } from "./mongoose";
import { Product } from "@/app/models/Product";

export default async function productDetails() {
    await mongooseConnect();

    // const searchParams = useSearchParams()
    const product = await Product.find({});
    console.log(product)
    return {
            product: JSON.parse(JSON.stringify(product)),
        }
}