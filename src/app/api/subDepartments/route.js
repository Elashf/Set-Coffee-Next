import connectToDB from "@/configs/db";
import subDepartmentModel from "../../../../models/SubDepartment";


export async function POST(request) {
  try {
    await connectToDB();

    const { title } = await request.json();

    await subDepartmentModel.create({ title, department });
    return Response.json(
      { message: "SubDepartment created successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: "unknown error ", error }, { status: 500 });
  }
}