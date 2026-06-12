import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";


/*const Comments = ({productID , comments}) => {
  return (
    <div>
      <p>نظرات ({comments.filter((comment)=> comment.isAccept).length || 0}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {comments.filter((comment)=>comment.isAccept).length } دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD )
            ده -10- عددی
          </p>
          <div>
            {comments?.filter((comment) => comment.isAccept).map((comment)=> (
            <Comment key={comment?._id} {...comment}/>)
            )}
            
          
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={productID}/>
        </div>
      </main>
    </div>
  );
};*/

const Comments = ({ productID, comments }) => {
  const safeComments = Array.isArray(comments) ? comments : [];
  const acceptedComments = safeComments.filter(c => c.isAccept);
console.log(comments);

  return (
    <div>
      <p>نظرات ({acceptedComments.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {acceptedComments.length} دیدگاه برای محصول
          </p>

          <div>
            {acceptedComments.map((comment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        </div>

        <div className={styles.form_bg}>
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
