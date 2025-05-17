import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import FarmersSection from "@/components/FarmersSection";


export async function generateMetadata() {

    return {
        title: "Meet Our Farmers – Connect Directly | Kissan Growth",
        description: "Discover and connect with real farmers on Kissan Growth. Support local agriculture by buying fresh, farm-grown products directly from trusted farmers.",
        keywords: "Farmers, Local farmers, Connect with farmers, Buy from farmers, Kissan Growth farmers, Organic farmers, Farmer marketplace, Support local farmers, Fresh produce farmers"
    };

}

const Page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Our Farmers"} />
            <FarmersSection />
        </ClientLayoutWrapper>

    );

};

export default Page;
