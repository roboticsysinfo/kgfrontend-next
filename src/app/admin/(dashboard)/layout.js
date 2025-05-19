'use client';
import React from 'react';
import Sidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/admin/AdminNavbar';
import { useEffect } from 'react';
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
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <main style={{ padding: '1rem' }}>{children}</main>
      </div>
    </div>
  );
}
