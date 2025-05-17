"use client"; // This is the key

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "@/redux/store";
import BootstrapInit from "@/helper/BootstrapInit";
import RouteScrollToTop from "@/helper/RouteScrollToTop";
import PhosphorIconInit from "@/helper/PhosphorIconInit";

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      <BootstrapInit />
      <PhosphorIconInit />
      <RouteScrollToTop />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}
