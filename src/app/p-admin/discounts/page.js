import Table from "@/components/templates/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import connectToDB from "@/configs/db";
import discountModel from "@/models/discount";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";

const discounts = async () => {
  await connectToDB();
  const discounts = await discountModel.find({}).sort({_id:-1}).lean();

  return (
    <Layout>
      <main>
        <AddDiscount />
        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default discounts;
