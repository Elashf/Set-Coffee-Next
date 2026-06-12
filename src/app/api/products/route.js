import connectToDB from "@/configs/db";
import productModel from "../../../../models/Product";
import { authAdmin } from "@/utils/authUser";
import { NextResponse } from "next/server";
//import fs from "fs"
import { writeFile } from "fs/promises";
import path from "path";


export async function POST(request) {
  const isAdmin = await authAdmin();
  
  if (!isAdmin) {
    throw new Error("This api is protected!");
  }

  try {
    await connectToDB();
    const formData = await request.formData();
    const name = formData.get("name");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const price = formData.get("price");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags");
    const img = formData.get("img");
const filename = Date.now() + img.name;
    const product = await productModel.create({
      name,
      shortDescription,
      longDescription,
      price,
      weight,
      suitableFor,
      smell,
      tags,
      img: `/uploads/${filename}`,
    });

    const buffer = Buffer.from(await img.arrayBuffer());
    
    const imgPath = path.join(process.cwd(), "/public/uploads/" + filename);
    await writeFile(imgPath, buffer);

    return Response.json(
      { message: "Product created successfully", data: product },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    
    return Response.json({ message: error }, { status: 500 });
  }
}
/**************************************** */

export async function PUT(request) {
  try {
    await connectToDB();
    const formData = await request.formData();
    const img = formData.get("img");
    if (!img) {
      return NextResponse.json(
        { message: "Product has not image" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const pathfile = path.join(process.cwd(), "/public/uploads" + filename);
    await writeFile(pathfile, buffer);

    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/******************************************** */
export async function GET(request) {
  const products = await productModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}
