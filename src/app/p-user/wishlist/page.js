
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "../../../styles/wishlist.module.css";
import connectToDB from "@/configs/db";

import wishlistModel from "../../../../models/Wishlist";
import { authUser } from "@/utils/authUser";
import Product from "@/components/modules/product/Product";
import productModel from "../../../../models/Product";


const page = async () => {
  await connectToDB();
  const user = await authUser();
  const wishlist = await wishlistModel.find({ user: user._id }).populate(
    "product").lean();



  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length >0 &&
          wishlist.filter((wish)=> wish.product).map((wish) =>
             <Product key={wish._id} 
            name={wish.product.name}
            price={wish.product.price}
            score={wish.product.score}
            img={wish.product.img}
            />)} 
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
