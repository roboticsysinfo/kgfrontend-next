// src/app/contact/page.jsx

import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Login from "@/components/Login";


export async function generateMetadata() {

    return {
      title:"Kissan Growth Customer Login - Order Directly from Farmers",
      description:"Log in to Kissan Growth to access farmer shops and place your order directly. Enjoy fresh, local produce delivered with ease. Shop now and support farmers!",
      keywords: "Customer login, Farmer shop order, Fresh produce delivery, Local farm products, Online grocery shopping, Order from farmers, Kissan Growth login"
    };

}

const page = async () => {

    return (

        <ClientLayoutWrapper>
            <Breadcrumb title={"Customer Login"} />
            <Login />
        </ClientLayoutWrapper>

    );

};

export default page;
