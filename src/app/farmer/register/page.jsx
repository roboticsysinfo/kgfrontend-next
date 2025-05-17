// src/app/contact/page.jsx
import FarmerRegister from "@/components/farmer/FarmerRegister";


export async function generateMetadata() {

    return {

        title: "Register as a Farmer | KissanGrowth",
        description: "Join KissanGrowth to access modern farming tools, market insights, and support. Register now to become part of India's digital agriculture revolution.",
        keywords: "farmer registration, KissanGrowth, digital farming India, agriculture platform, online registration for farmers, farmer support India, agri tech solutions, Indian farmers, smart farming, farmer tools"

    };

}

const page = async () => {

    return (

        <FarmerRegister />

    );

};

export default page;
