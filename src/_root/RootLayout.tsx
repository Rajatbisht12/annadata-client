import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full h-dvh flex flex-col justify-between">
      <div className="p-4 flex justify-between">
        <p className="text-primary font-semibold text-lg">AnnaData</p>
        <div>
          <img src="/notification.png" alt="" className="w-7" />
        </div>
      </div>

      <Outlet />

      <div className="shadow p-4 flex justify-around">
        <Link to="/home">
          <img src="/home.png" alt="" className="w-7 object-contain" />
        </Link>
        <Link to="/hotspot-areas">
          <img src="/location.png" alt="" className="w-8 object-contain" />
        </Link>
        <Link to="/profile">
          <img src="/user.png" alt="" className="w-7 object-contain" />
        </Link>
      </div>
    </div>
  );
};

export default RootLayout;
