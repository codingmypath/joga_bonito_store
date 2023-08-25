import { mongooseConnect } from "./mongoose";
import { Product } from "@/app/models/Product";

export default async function allProducts() {
    await mongooseConnect();
    const all = await Product.find({}, null, {sort:{'_id':-1}});
    console.log(all)
    return {
            all: JSON.parse(JSON.stringify(all)),
        }
}