"use client";

import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/slices/notificationsSlice";
import { FaRegBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const FarmerAdminNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notifications.unreadCount);

  const [username, setUsername] = useState(null); // ✅ state to avoid SSR mismatch

  useEffect(() => {
    const farmerId = Cookies.get("farmerId");
    const name = Cookies.get("farmerName");
    if (farmerId) {
      dispatch(fetchNotifications());
    }
    if (name) {
      setUsername(name); // ✅ safe client-side set
    }
  }, [dispatch]);

  const onLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userRole");
    Cookies.remove("farmerId");
    Cookies.remove("farmerName");
    router.push("/farmer/login");
  };

  return (
    <Navbar bg="success" variant="dark" className="px-20 py-20">
      <Navbar.Brand href="/">Farmer Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Link href="/farmer-panel/notifications" className="notification_link">
          <div className="notification_bell">
            <FaRegBell />
            {unreadCount > 0 && (
              <Badge pill bg="danger" className="notificatin_badge">
                {unreadCount}
              </Badge>
            )}
          </div>
        </Link>

        {username && (
          <Navbar.Text className="me-3 text-white">
            Hello, {username}
          </Navbar.Text>
        )}

        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default FarmerAdminNavbar;
