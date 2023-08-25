
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/app/models/Product";
import { NextResponse } from "next/server";


export async function POST(request, response) {
    await mongooseConnect();
    console.log("ENTERED")
    const body = await request.json();
    // const ids = request.body.ids;
    console.log("body:", body)
    const ids = body.ids;
    console.log("ids:", ids)
    // console.log("IDS1:", ids1)
    return NextResponse.json(await Product.find({_id:ids}));
}