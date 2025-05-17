import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/redux/slices/categorySlice';
import productReducer from '@/redux/slices/productSlice';
import shopReducer from "@/redux/slices/shopSlice";
import kycRequestsReducer from '@/redux/slices/kycRequestsSlice';
import farmersReducer from '@/redux/slices/farmerSlice';
import adminReducer from '@/redux/slices/adminSlice';
// import cartReducer from '@/redux/slices/cartSlice';
import requestOrderReducer from '@/redux/slices/requestOrderSlice';
import reviewReducer from '@/redux/slices/reviewSlice';
import customerReducer from '@/redux/slices/customerSlice';
import siteDetailsReducer from '@/redux/slices/siteDeatilsSlice';
import bannersReducer from '@/redux/slices/bannersSlice';
import blogCategoryReducer from '@/redux/slices/blogCategorySlice';
import blogsReducer from '@/redux/slices/blogSlice'
import redeemProductsReducer from '@/redux/slices/redeemProductSlice';
import adminMessageReducer from '@/redux/slices/adminMessageSlice';
import farmingTipsReducer from '@/redux/slices/farmingTipsSlice';
import customerRedeemProductReducer from '@/redux/slices/customerRedeemProductSlice';
import customerHelpSupportReducer from '@/redux/slices/customerHelpSupportSlice';
import familyFarmerReducer from '@/redux/slices/farmerFamilySlice';
import planPointsHistoryReducer from "@/redux/slices/planPointsHistorySlice";
import notificationsReducer from "@/redux/slices/notificationsSlice";


const store = configureStore({

  reducer: {

    admins: adminReducer,
    categories: categoryReducer,
    products: productReducer,
    shop: shopReducer,
    kycRequests: kycRequestsReducer,
    farmers: farmersReducer,
    // cart: cartReducer,
    requestOrder: requestOrderReducer,
    reviews: reviewReducer,
    customer: customerReducer,
    siteDetails: siteDetailsReducer,
    banners: bannersReducer,
    blogCategory: blogCategoryReducer,
    blogs : blogsReducer,
    redeemProducts: redeemProductsReducer,
    adminMessages: adminMessageReducer,
    farmingTips: farmingTipsReducer,
    customerRedeemProducts: customerRedeemProductReducer,
    customerHelpSupport: customerHelpSupportReducer,
    familyfarmer: familyFarmerReducer,
    planPointsData: planPointsHistoryReducer,
    notifications: notificationsReducer,
  },

});


export default store;
