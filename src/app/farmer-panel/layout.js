"use client"
import React, { useEffect } from 'react';
import FarmerAdminNavbar from '@/components/farmer/FarmerAdminNavbar';
import FarmerAdminSidebar from '@/components/farmer/FarmerAdminSidebar'
import { useRouter } from 'next/navigation';

export default function FarmerLayout({ children }) {

  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/farmer/login');
    }
  }, []);

  return (

    <div className="d-flex">
      <FarmerAdminSidebar />
      <div className="flex-grow-1">
        <FarmerAdminNavbar />
        <div className="container mt-60">
          {children}
        </div>
      </div>
    </div>

  );
}

