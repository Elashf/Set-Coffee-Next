import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import Map from "@/components/templates/contact-us/Map";
import Link from "next/link";
import { authUser } from "@/utils/authUser";

const page = async () => {

 const user = await authUser()

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
      <main className={styles.maps}>
<section>
  <Map
  position={[35.72021225108499, 51.42222691580869]}
  center={[35.72021225108499, 51.42222691580869]}
  >
    <span>فروشگاه ما</span>
    <h3>شعبه جم فروشگاه حضوری قهوه ست</h3>
    <p> تهران کریمخان زند قایم مقام فراهانی ابتدای خیابان فجر</p>
    <p>021-88305827</p>
    <Link style={{color:"gray"}} href="/about">درباره فروشگاه</Link>
  </Map>
</section>
<section>
  <Map
  position={[35.70153474690238, 51.41497422314844]}
  center={[35.70153474690238, 51.41497422314844]}
  >
    <span>فروشگاه ما</span>
    <h3>شعبه جم فروشگاه حضوری قهوه ست</h3>
    <p> تهران کریمخان زند قایم مقام فراهانی ابتدای خیابان فجر</p>
    <p>021-88305827</p>
    <Link style={{color:"gray"}} href="/about">درباره فروشگاه</Link>
  </Map>
</section>
      </main>
      </div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
