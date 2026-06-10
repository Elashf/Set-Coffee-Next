import connectToDB from "@/configs/db";
import subDepartmentModel from "../../../../../../models/SubDepartment";
import { isValidObjectId } from "mongoose";


export async function GET(request, { params }) {
  try {
    await connectToDB();
    const {id} =await  params;

    if(!isValidObjectId(id)){
          return Response.json({message: "Id is not valid "},{status:422})
    }

   
    
   
    const subDepartments = await subDepartmentModel.find({ department: id });

  
    return Response.json(subDepartments, { status: 200 });
  } catch (error) {
    return Response.json({ message: "unknown error ", error }, { status: 500 });
  }
}
