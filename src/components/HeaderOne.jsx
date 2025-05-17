"use client"

import React, { useEffect, useState } from 'react'
import query from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiLogOut } from "react-icons/fi";
import HeaderSearch from '@/components/HeaderSearch';
import { FaRegBell } from "react-icons/fa";
import { Badge, NavLink } from 'react-bootstrap';
import { fetchNotifications } from '@/redux/slices/notificationsSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


const HeaderOne = () => {

  const router = useRouter();

  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.notifications.unreadCount);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchNotifications());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  const userId = user?.id;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    toast.success('Logout Successfully');
    router.push('/login');
  };

  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };



  return (
    <>
      <div className="overlay" />
      <div className={'side-overlay'} />
      {/* ==================== Search Box Start Here ==================== */}
      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl pe-64"
              placeholder="Search for a product or brand"
            />
            <button
              type="submit"
              className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
            >
              <i className="ph ph-magnifying-glass" />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}

      {/* ==================== Mobile Menu Start Here ==================== */}
      <div className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive && "active"}`}>
        <button onClick={() => { handleMenuToggle(); setActiveIndex(null) }} type="button" className="close-button">

          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">

          <Link href="/home" className="mobile-menu__logo">
            <img src="/assets/images/kg-logo.jpg" alt="Logo" />
          </Link>

          <div className="mobile-menu__menu">

            {/* Nav Menu Start */}
            <ul className="nav-menu flex-align nav-menu--mobile">
              {/* Home Menu */}

              <li onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 0 ? "d-block" : ""
                  }`}
              >
                <Link
                  href="/home"
                  className="nav-menu__link"

                >
                  Home
                </Link>
              </li>


              <li onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 0 ? "d-block" : ""
                  }`}
              >
                <Link
                  href="/about-us"
                  className="nav-menu__link"

                >
                  About Us
                </Link>
              </li>


              <li onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 0 ? "d-block" : ""
                  }`}
              >
                <Link
                  href="/products"
                  className="nav-menu__link"

                >
                  Products
                </Link>
              </li>


              {/* Farmer Menu */}
              <li onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 1 ? "d-block" : ""
                  }`}
              >

                <Link
                  href="/farmers"
                  className="nav-menu__link"

                >
                  Farmers
                </Link>

              </li>


              {/* Shop Menu */}
              <li onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 1 ? "d-block" : ""
                  }`}
              >
                <Link
                  href="/shop"
                  className="nav-menu__link"

                >
                  Farmers Shops
                </Link>
              </li>


              {/* Blog Menu */}
              <li onClick={() => handleMenuClick(3)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 3 ? "d-block" : ""
                  }`}
              >
                <Link
                  href="/blogs"
                  className="nav-menu__link"

                >
                  Blogs
                </Link>
              </li>

              {/* Contact Us Menu */}
              <li className="nav-menu__item">
                <Link
                  href="/contact"
                  className="nav-menu__link"
                  onClick={() => setActiveIndex(null)}
                >
                  Contact Us
                </Link>
              </li>

            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}

      {/* ======================= Middle Top Start ========================= */}
      <div className="header-top bg-main-600 flex-between">
        <div className="container container-lg">
          <div className="flex-between flex-wrap gap-8">
            <ul className="flex-align flex-wrap d-none d-md-flex">
              <li className="border-right-item">
                <Link
                  href="/farmer/register"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Register as Farmer
                </Link>
              </li>
              <li className="border-right-item">
                <Link
                  href="/about-us"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  About us
                </Link>
              </li>

              <li className="border-right-item">
                <a
                  href="https://play.google.com/store/apps/details?id=com.yourapp.farmer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className='header_app'>
                    <Image src="/assets/images/google-play-store.png" alt='Google Play Store' width={100} height={50} />
                    <p>Download Android App for Farmer</p>
                  </div>
                </a>

              </li>

              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.yourapp.farmer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className='header_app'>
                    <Image src="/assets/images/google-play-store.png" alt='Google Play Store' width={100} height={50} />
                    <p>Download Android App for Customer</p>
                  </div>
                </a>

              </li>

            </ul>
            <ul className="header-top__right flex-align flex-wrap">
              <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                <Link href="/contact" className="text-white text-sm py-8">
                  Help Center
                </Link>
                <ul className="on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                  <li className="nav-submenu__item">
                    <Link
                      href="/contact"
                      className="nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <span className="text-sm d-flex">
                        <i className="ph ph-headset" />
                      </span>
                      Call Center
                    </Link>
                  </li>

                </ul>
              </li>

              <li className="border-right-item">
                <Link
                  href="/account"
                  className="text-white text-sm py-8 flex-align gap-6"
                >
                  <span className="icon text-md d-flex">
                    {" "}
                    <i className="ph ph-user-circle" />{" "}
                  </span>
                  <span className="hover-text-decoration-underline">
                    My Account
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================= Middle Top End ========================= */}


      {/* ======================= Middle Header Start ========================= */}
      <header className="header-middle bg-color-one border-bottom border-gray-100">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link href="/" className="link">
                <img src="/assets/images/kg-logo.jpg" alt="Logo" />
              </Link>
            </div>
            {/* Logo End  */}

            <HeaderSearch />


            <div className='dflexinpugroup '>

              {userId ? (
                <>

                  <Link href="/notifications">
                    <div className='notification_bell'>
                      <FaRegBell />
                      {unreadCount > 0 && (
                        <Badge pill bg="danger" className="notificatin_badge">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                  </Link>

                  <div className='mob_view_user_info'>
                    <Link href="/account" className="flex-align gap-4 item-hover">
                      <div className="profile_dropdown">
                        <img src="https://avatar.iran.liara.run/public/boy" alt="Username" width={38} height={38} />
                      </div>
                    </Link>
                  </div>

                </>

              ) : (

                <div className="mob_view_account_info">
                  <Link href="/register" className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    <button className='btn btn-success btn-sm'>Register as a Customer</button>
                  </Link>
                </div>

              )}

              {userId ? (

                <>
                  <div className="mob_view_user_info">

                    <button className="btn btn-sm btn-danger btn-sm text-center" onClick={handleLogout}><FiLogOut />&ensp;Logout</button>

                  </div>

                </>
              ) : (

                <div className="mob_view_account_info">

                  <Link href="/login" className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    <button className="btn btn-secondary btn-sm text-center" >Customer Login</button>
                  </Link>

                </div>


              )}

            </div>

            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="flex-align flex-wrap gap-12">

                <button
                  type="button"
                  className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                >
                  <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>

                {userId ? (
                  <>

                    <Link href="/notifications">
                      <div className='notification_bell'>
                        <FaRegBell />
                        {unreadCount > 0 && (
                          <Badge pill bg="danger" className="notificatin_badge">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    </Link>

                    <Link href="/account" className="flex-align gap-4 item-hover">
                      <div className="profile_dropdown">
                        <img src="https://avatar.iran.liara.run/public/boy" alt="Username" width={38} height={38} />
                        <h6>{user.name}</h6>
                      </div>
                    </Link>

                  </>

                ) : (
                  <Link href="/register" className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    <button className='btn btn-success'>Register</button>
                  </Link>
                )}

                {userId ? (
                  <>
                    <button className="btn btn-sm btn-danger text-center" onClick={handleLogout}><FiLogOut />&ensp;Logout</button>
                  </>

                ) : (
                  <Link href="/login" className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    <button className="btn btn-secondary text-center" >Login</button>
                  </Link>
                )}

              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div >
      </header >
      {/* ======================= Middle Header End ========================= */}


      {/* ==================== Header Start Here ==================== */}
      <header className={`header bg-white border-bottom border-gray-100 ${scroll && "fixed-header"}`}>
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}

              <div className="category on-hover-item">

                <div className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper`}>

                  {/* Logo Start */}

                  <div className="logo px-16 d-lg-none d-block">
                    <Link href="/" className="link">
                      <img src="/assets/images/kg-logo.jpg" alt="Logo" />
                    </Link>
                  </div>

                  {/* Logo End */}

                </div>
              </div>
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align ">
                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/" className="nav-menu__link">
                      Home
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/products" className="nav-menu__link">
                      Products
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/farmers" className="nav-menu__link">
                      Farmers
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/shops" className="nav-menu__link">
                      Shops
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/blogs" className="nav-menu__link">
                      Blogs
                    </Link>
                  </li>
                  <li className="nav-menu__item">
                    <Link href="/contact" className="nav-menu__link">
                      Contact Us
                    </Link>
                  </li>

                  <li className="on-hover-item nav-menu__item ">
                    <Link href="/kissan-growth-mobile-apps" className="nav-menu__link">
                      Kissan Growth Mobile Apps
                    </Link>
                  </li>

                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">

              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>

            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}

    </>

  )
}

export default HeaderOne