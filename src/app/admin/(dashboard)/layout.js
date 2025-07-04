'use client';
import React, { useEffect } from 'react';
import Sidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/admin/AdminNavbar';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/admin/login');
    }
  }, []);

  return (
    <>
      {/* Fixed Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        zIndex: 1000,
        backgroundColor: '#fff',
        borderRight: '1px solid #ddd',
        overflowY: 'auto'
      }}>
        <Sidebar />
      </div>

      {/* Fixed Navbar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '250px',
        right: 0,
        height: '60px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
        zIndex: 1001,
      }}>
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="admin-content">
        {children}
      </main>

    </>
  );
}
