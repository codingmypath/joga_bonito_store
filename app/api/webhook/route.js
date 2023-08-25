import { Order } from "@/app/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
// import { buffer } from 'micro';
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = process.env.ENDPOINT_SECRET;


export async function POST(request, response) {
    await mongooseConnect();

    const buf = await request.text()
    console.log("ENTERED WEBHOOK")
    const sig = request.headers.get('stripe-signature');
    // let data = await request.json();
    let event;
  
    try {
      console.log("constructing event...")
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    // } catch (err) {
    //   response.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }
    } catch (error) {
      return NextResponse.error(error);
    }

    // console.log("EVENT:", event)
    // console.log("EVENT.TYPE:", event.type)
    
    // Handle the event
    switch (event.type) {
      // case 'checkout.session.completed':
      case 'checkout.session.completed':
        // console.log('Payment_intent')
        // console.log("switch event:", event);
        // console.log("switch event.data: ", event.data);

        const paymentIntentSucceeded = event.data.object;
        console.log("paymentIntentS:", paymentIntentSucceeded);
    
        const orderId = paymentIntentSucceeded.metadata.orderId;
        const paid = paymentIntentSucceeded.payment_status === 'paid';
        if (orderId && paid) {
            await Order.findByIdAndUpdate(orderId, {
                paid: true,
            })
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // response.status(200).send('ok');
    return NextResponse.json({received: true})
}

// export const config = {
//     api: {bodyParser: false,}
// }

