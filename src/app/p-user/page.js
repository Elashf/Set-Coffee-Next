import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/authUser";
import commentModel from "@/models/Comment";
import wishlistModel from "@/models/Wishlist";


const page =async () => {

  const user = await authUser()
  const tickets =await ticketModel.find({user:user._id}).limit(3).populate("department" , "title").sort({_id:-1}).lean()
  
  const comments = await commentModel.find({user:String(user._id)})
  const whishes = await wishlistModel.find({user:user._id})
 
  
  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={tickets.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={whishes.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))}/>
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
