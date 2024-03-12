import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-dvh p-4 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
