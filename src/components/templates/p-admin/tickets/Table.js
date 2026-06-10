"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";

export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketBody = (body) => {
    showSwal(body, undefined, "بستن");
  };

  const answerToTicket = async (ticket) => {
    swal({
      title: "پاسخ خود را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answer) => {
      if (answer) {
        const answers = { ...ticket, body: answer, ticketID: ticket._id };

        const res = await fetch("/api/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });
        if(res.status===201){
          swal({
            title:"پاسخ شما ثبت شد",
            icon:"success",
            buttons:"OK"
          })
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => answerToTicket(ticket)}
                    type="button"
                    className={styles.delete_btn}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
