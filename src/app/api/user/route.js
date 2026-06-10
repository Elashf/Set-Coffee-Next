import connectToDB from "@/configs/db";
import userModel from "../../../../models/User";
import { authUser } from "@/utils/authUser";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectToDB();
    const user = await authUser();
    const { name, email, phone } = await request.json();

     await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      },
    );
    return Response.json({ message: "User updated successfully" },{status:200});
  } catch (error) {
    return Response.json({ message: "unknown error , error" },{status:500});
  }
}


export async function DELETE(request) {
  try {
    await connectToDB();
    
    const { id } = await request.json();
    const isValidID = mongoose.Types.ObjectId.isValid(id)
       if(!isValidID){
        return Response.json({ message: "شناسه نامعتبر است" },
    { status: 422 })
       }

     await userModel.findOneAndDelete(
      { _id: id },
      
    );
    return Response.json({ message: "User deleted successfully" },{status:200});
  } catch (error) {
    return Response.json({ message:  error.message },{status:500});
  }
}
