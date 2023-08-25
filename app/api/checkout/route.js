import { Order } from "@/app/models/Order";
import { Product } from "@/app/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SK);


export async function POST(request, response) {
    // try {	
        await mongooseConnect();	
        console.log("CHECKOUT")
        // const { name, parentCategory, properties } =  await request.json();
        const {name, email, address, city, zipCode, country, cartProducts} = await request.json();
        // console.log("form products:", cartProducts);
        const productsIds = cartProducts;
        // console.log("productsIds:", productsIds);
        const uniqueIds = [...new Set(productsIds)];
        // console.log("uniqueIds:", uniqueIds)
        const productsInfos = await Product.find({_id:uniqueIds});
        // console.log("productsInfos:", productsInfos)


        let line_items = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            console.log("productInfo:", productInfo)
            const quantity = productsIds.filter(id => id === productId)?.length || 0;
            console.log("quantity:", quantity)
            if (quantity > 0 && productInfo) {
                console.log("Price: ", productInfo.price)
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'USD',
                        product_data:  {name:productInfo.title},
                        unit_amount: quantity * productInfo.price * 100,
                    },
                });
            }
        }
        const orderDoc = await Order.create({
            line_items, name, email, address, city, zipCode, country, paid:false,
        });

        console.log("orderDoc", orderDoc)

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: process.env.PUBLIC_URL + '/cart?success=1',
            cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
            metadata: {orderId:orderDoc._id.toString()},

        });
        // console.log("SESSION: ", session)

        return NextResponse.json({
            url:session.url,
        })
}
