"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next"; // ✅ cookies-next import

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleCaptchaChange = (value) => {
  //   setCaptchaValue(value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!captchaValue) {
    //   toast.error("Please Complete CAPTCHA");
    //   return;
    // }

    setLoading(true);
    try {
      const response = await api.post("/auth/customer_login", {
        ...formData,
        // captchaValue,
      });

      // ✅ Set cookies using cookies-next
      const options = { path: "/", maxAge: 60 * 60 * 24 * 7 }; // 7 days
      setCookie("token", response.data.token, options);
      setCookie("userRole", response.data.userRole, options);
      setCookie("user", JSON.stringify(response.data.user), options);

      toast.success("Login successful");

      if (response.data.userRole === "customer") {
        router.push("/account");
      } else {
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center gy-4">
            <div className="col-xl-6 pe-xl-5">
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                <h6 className="text-xl">Customer Login</h6>
                <p className="text-muted mb-32">
                  Login to Kissan Growth and order fresh produce directly from
                  local farmers for a quicker and easier shopping experience.
                </p>

                <div className="mb-24">
                  <label
                    htmlFor="email"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div className="mb-24">
                  <label
                    htmlFor="password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="common-input"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                </div>

                {/* <div className="mb-24">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div> */}

                <div className="mb-24 mt-48">
                  <button
                    type="submit"
                    className="btn btn-success py-18 px-40"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>

                {/* Optional: Forgot Password */}
                {/* <div className="mt-48">
                  <Link
                    href="/forgot-password"
                    className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                  >
                    Forgot your password?
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
