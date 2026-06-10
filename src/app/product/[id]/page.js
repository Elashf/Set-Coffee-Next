import styles from "../../../styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";

import productModel from "../../../../models/Product";
import connectToDB from "@/configs/db";
import model from "../../../../models/Comment";
import { authUser } from "@/utils/authUser";

const product = async ({ params }) => {
  await connectToDB();
  const user = await authUser();
  const {id} = await params;
  
  const product = await productModel
    .findOne({ _id: id })
    .populate("comments");

  const relatedProducts = await productModel.find({ smell: product.smell });

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />

          <Gallery product={JSON.parse(JSON.stringify(product))}/>
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
