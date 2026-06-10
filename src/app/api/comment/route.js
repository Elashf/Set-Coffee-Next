import connectToDB from "@/configs/db";
import commentModel from "../../../../models/Comment";
import productModel from "../../../../models/Product";



export async function POST(request) {
  try {
    await connectToDB();
    const { username, body, email, score, productID } = await request.json();

    

    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

     

    const updateProduct = await productModel.findOneAndUpdate({_id : productID} , {
        $push:{comments: comment._id}
    })
console.log("PRODUCT =>", updateProduct);
    return Response.json({message:"Comment create successfully" , data:comment},{status:201})

  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
    
  }
}
  

  export async function GET() {
    await connectToDB()
    const comments =await commentModel.find({}, '-__v').populate("productID")
    return Response.json(comments)
}
