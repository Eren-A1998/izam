"use client";
import { queryClient } from "@/api/queryClient";
import Navigation from "@/components/Navigation";
import { Drawer } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full">
        <div className="text-center fixed top-0 z-40 w-full shadow ">
          <Header />
        </div>
        <div className="flex flex-1 h-full">
          <aside
            className={`fixed bottom-0 left-0 z-10 hidden h-[calc(100vh-80px)] bg-white shadow transition-[width] duration-300 lg:block  overflow-y-auto w-96`}
          >
            <Navigation />
          </aside>
          <div className="min-h-screen relative flex flex-1 w-full flex-col justify-start pt-[72px] transition-[padding] duration-300 lg:pt-20 ml-96">
            <div className="px-10 py-6 h-full">{children}</div>
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Navigation />
      </Drawer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover
        transition={Bounce}
        limit={1}
      />
    </QueryClientProvider>
  );
};

export default MainLayout;
