// src/app/contact/page.jsx

import FarmerLogin from "@/components/farmer/FarmerLogin";


export async function generateMetadata() {

    return {
        title: "Farmer Login | KissanGrowth – Access Your Farming Dashboard",
        description: "Log in to your KissanGrowth account to manage your shop, check points, and stay updated with the latest farming tools. Easy access for farmers.",
        keywords: "armer login, KissanGrowth login, farming dashboard, digital farming India, shop management for farmers, agriculture platform login, farmer points system, KissanGrowth account"
    };

}

const page = async () => {

    return (

        <FarmerLogin />

    );

};

export default page;
