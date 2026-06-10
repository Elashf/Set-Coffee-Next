import connectToDB from "@/configs/db"
import departmentModel from "../../../../models/Department"


export async function POST(request) {
    try {
          await connectToDB()
   
    const {title} = await request.json()

await departmentModel.create({title })
 return Response.json({message: "Department created successfully"},{status:200})

    } catch (error) {
         return Response.json({message: "unknown error " ,error},{status:500})
    }
    }

export async function GET(request) {
await connectToDB()

const departments =await departmentModel.find({})

return Response.json(departments)
}