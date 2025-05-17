
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import SiteTermsConditionsSection from "@/components/SiteTermsConditionsSection";


export async function generateMetadata() {

    return {
        title: "Terms and Conditions - Kissan Growth",
        description: "Explore Kissan Growth's terms and conditions for website usage. Understand your rights, privacy, cookies, and third-party services while using our platform.",
        keywords: "Kissan Growth Terms and Conditions, website terms, legal agreement, privacy policy, cookies usage, intellectual property, third-party services, website usage rules, legal terms, Robotic Sysinfo, India’s #1 Farm Online Marketplace, kissan growth farmer app, kissan growth customer app"
    };

}

const page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Terms & Conditions"} />
            <SiteTermsConditionsSection />
        </ClientLayoutWrapper>

    );

};

export default page;
