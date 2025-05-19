"use client"

import React, { useEffect } from "react";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/slices/notificationsSlice";
import { FaRegBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';  


const FarmerAdminNavbar = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notifications.unreadCount);

  useEffect(() => {
    const farmerId = Cookies.get('farmerId');
    if (farmerId) {
      dispatch(fetchNotifications());
    }
  }, [dispatch]);

  
  const onLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userRole');
    Cookies.remove('farmerId');
    Cookies.remove('farmerName');
    router.push("/farmer/login");
  };

  const userRole = Cookies.get('userRole');
  const username = Cookies.get('farmerName');

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
