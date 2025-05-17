// src/app/contact/page.jsx

import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Register from "@/components/Register";


export async function generateMetadata() {

    return {
        title: "Customer Registration - Join Kissan Growth",
        description: "Sign up on Kissan Growth to become a customer and start shopping directly from the farmers' shops. Enjoy fresh, local produce and support farming.",
        keywords: "Customer registration, Register as customer, Join Kissan Growth, Online grocery shopping, Local farm products, Fresh produce, Shop from farmers, Kissan Growth sign up"
    };

}

const page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Regsiter as a Customer"} />
            <Register />
        </ClientLayoutWrapper>

    );

};

export default page;
