import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({ username, body, score = 0, date }) => {
  const safeScore = score || 0;
  
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />

      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{username}</strong>
            <p>{new Date(date).toLocaleDateString("fa-IR")}</p>
          </div>

          <div className={styles.stars}>
            {Array.from({ length: safeScore }).map((_, i) => (
              <FaStar key={i} />
            ))}

            {Array.from({ length: 5 - safeScore }).map((_, i) => (
              <FaRegStar key={i} />
            ))}
          </div>
        </div>

        <p>{body}</p>
      </div>
    </section>
  );
};
export default Comment;
