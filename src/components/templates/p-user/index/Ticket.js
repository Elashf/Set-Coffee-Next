import Link from "next/link";
import styles from "@/components/templates/p-user/tickets/ticket.module.css";

const Ticket = ({ticket}) => {
 
  return (
    <Link href={`/p-user/tickets/answer/${ticket._id}`} className={styles.ticket}>
      <div>
        <p>{ticket.title}</p>
        <p className={styles.department}>{ticket.department?.title} </p>
      </div>
      <div>
        <p>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={ticket.hasAnswer ? styles.answer : styles.no_answer}>{ticket.hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}</p>
        
      </div>
    </Link>
  );
};

export default Ticket;
