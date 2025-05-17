// src/app/contact/page.jsx

import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import SitePrivacyPolicySection from "@/components/SitePrivacyPolicySection";


export async function generateMetadata() {

    return {
        title: "Privacy Policy | Kissan Growth",
        description: "Read Kissan Growth’s Privacy Policy to understand how we collect, use, and safeguard your personal information. Your privacy is important to us.",
        keywords: "privacy policy, personal data protection, Kissan Growth, data security, cookies, user privacy, personal information collection, website privacy, legal compliance, third-party sharing, data access rights, email updates, kissan growth farmer app, kissan growth customer app"
    };

}

const page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Privacy Policy"} />
            <SitePrivacyPolicySection />
        </ClientLayoutWrapper>

    );

};

export default page;
