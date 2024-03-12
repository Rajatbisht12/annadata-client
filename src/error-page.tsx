import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="w-full h-dvh flex justify-center items-center"
    >
      <div className="flex flex-col items-center gap-2">
        <img src="/assets/construction.png" alt="" />
        <p>Comming Soon...</p>
      </div>
    </div>
  );
}
