import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admindash_layout/Sidebar';
import Header from '../components/admindash_layout/Header';

export default function AdminDashLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      <div className="flex-1 ml-64">
        <Header/>
        <main className="p-6">
          <Outlet/> 
        </main>
      </div>
    </div>
  );
}