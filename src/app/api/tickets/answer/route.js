import { authAdmin, authUser } from "@/utils/authUser";
import ticketModel from "@/models/Ticket";
import connectToDB from "@/configs/db";
export async function POST(request) {
  const isAdmin = await authAdmin()
  if(!isAdmin){
    throw new Error("This api is protected!")
  }
  try {
    await connectToDB();
    const { title, body, department, subDepartment, priority, ticketID } =await request.json();

    const user = await authUser();
    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      isAnswer: true,
      hasAnswer: false,
      mainTicket: ticketID,
    });
    return Response.json({ message: "Answer saved" }, { status: 201 });
  } catch (error) {
    return Response.json(error.message , { status: 500 });
  }
}
