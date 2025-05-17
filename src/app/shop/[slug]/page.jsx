
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import ShopDetailsScreen from "@/components/ShopDetailsSection";


export async function generateMetadata() {
    return {
        title: "Kissan Growth: India’s #1 Farm Online Marketplace",
        description: "Kissan Growth, India’s #1 Farm Online Marketplace connecting local farmers and consumers.",
        keywords: "Kissan Growth, fresh produce, buy from farmers, organic fruits and vegetables, local farm marketplace",
    };
}


const page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Shop"} />
            <ShopDetailsScreen />
        </ClientLayoutWrapper>

    );

};

export default page;
