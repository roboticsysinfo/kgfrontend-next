import React from 'react';
import FarmerAdminNavbar from '@/components/farmer/FarmerAdminNavbar';
import FarmerAdminSidebar from '@/components/farmer/FarmerAdminSidebar'

export default function FarmerLayout({ children }) {
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
