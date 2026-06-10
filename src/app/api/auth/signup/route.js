import connectToDB from "@/configs/db";
import userModel from "../../../../../models/User";
import {
  generateAccessToken,
  hashPasswprd,
  verifyPassword,
} from "@/utils/auth";
import { NextResponse } from "next/server";


export async function POST(request) {
  await connectToDB();
  const body = await request.json();
  const { name, phone, email, password } = body;

  if(!name.trim() , !phone.trim() , !password.trim()){
    return Response.json({message: "The field can not be empty"},{status:411})
  }

  const isUserExist =await userModel.findOne({
    $or: [{ name }, { phone }],
  });
  if (isUserExist) {
    return Response.json(
      { message: "User already exist" },
      {
        status: 422,
      },
     
    );
  }

  const hashedPassword = await hashPasswprd(password);

  const token = generateAccessToken({ name });
  const users = await userModel.find({});
  await userModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? "USER" : "ADMIN",
  });
  const response = NextResponse.json(
    {
      message: "User added successfully",
    },
    {
      status: 201,
    },
  );
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
