import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { TbArrowAutofitContent } from "react-icons/tb";

const page = async ({ params }) => {
  const {id} =await params;
  connectToDB();
  const ticket = await TicketModel.findOne({ _id: id }).populate("user" , "name");
  const answerTicket = await TicketModel.findOne({mainTicket :ticket._id });



  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" ticket={JSON.parse(JSON.stringify(ticket))} />
          {answerTicket && <Answer type="admin" ticket={JSON.parse(JSON.stringify(answerTicket))}/>}
          
          {!answerTicket &&  <div className={styles.empty}>
            <p>هنوز پاسخی دریافت نکردید</p>
          </div>}
         
        </div>
      </main>
    </Layout>
  );
};

export default page;
