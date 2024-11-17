import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileData = useSelector((state: any) => state.user.userProfile);

  // Function to toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Visible permanently on desktop, togglable on smaller screens */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:flex lg:flex-col w-64`}
      >
        {/* Sidebar content */}
        <Navbar toggleSidebar={toggleSidebar} profileData={profileData}/>
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} profileData={profileData} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto max-h-[90vh]">{children}</main>
      </div>

      {/* Overlay for sidebar on smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;
