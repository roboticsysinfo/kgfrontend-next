"use client"

import React, { useEffect } from "react";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/slices/notificationsSlice";
import { FaRegBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";


const FarmerAdminNavbar = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notifications.unreadCount);


  useEffect(() => {
    const farmerId = localStorage.getItem('farmerId');
    if (farmerId) {
      dispatch(fetchNotifications());
    }
  }, [dispatch]);

  const onLogout = () => {
    // Clear the token and user role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("farmerId");
    localStorage.removeItem("farmerName")
    router.push("/farmer/login"); // redirect to '/Farmer/login'
  };

  // Get the userRole from localStorage
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("farmerName");

  return (

    <Navbar bg="success" variant="dark" className="px-20 py-20">
      <Navbar.Brand href="/">Farmer Dashboard</Navbar.Brand>
      <Nav className="ms-auto">

        <Link href="/farmer/notifications" className="notification_link">
          <div className='notification_bell'>
            <FaRegBell />
            {unreadCount > 0 && (
              <Badge pill bg="danger" className="notificatin_badge">
                {unreadCount}
              </Badge>
            )}
          </div>
        </Link>

        <Navbar.Text className="me-3 text-white">Hello, {username}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default FarmerAdminNavbar;
