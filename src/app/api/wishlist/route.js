import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import wishlistModel from "@/models/Wishlist";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();
  const user = await authUser()
  const body = await request.json();
  const {productId} = body
await wishlistModel.create({
  user: user._id,
  product: productId,
});

  return Response.json(
    { message: "ok" },
    { status: 200 }
  );
}





export async function GET(request) {
  await connectToDB();
  const wishlist = await wishlistModel.find({})
  return NextResponse.json({wishlist} );
}