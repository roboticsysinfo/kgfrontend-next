"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { deleteCookie, getCookie } from "cookies-next";

const AdminNavbar = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Client-side cookie से userRole पढ़ो
    const role = getCookie("userRole");
    setUserRole(role || "");
  }, []);

  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("userRole");
    
    // अगर localStorage में भी store किया है, तो हटाओ
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("farmerName");

    router.push("/admin/login");
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Navbar.Text className="me-3">Welcome, {userRole}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
