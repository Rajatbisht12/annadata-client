import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Credentials {
  email: string;
  password: string;
  phone: string;
  isVolunteer: boolean;
  organisation?: string;
}

const SignUp = () => {
  const [creds, setCreds] = useState<Credentials>({
    email: "",
    password: "",
    phone: "",
    isVolunteer: false,
    organisation: "",
  });

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: newValue,
    }));

    console.log(creds);
  };

  const onSubmit = () => {
    // TODO: Handle registration
  };

  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-4xl">Welcome</p>
      <p className="text-muted-foreground font-semibold text-lg mt-2">
        {" "}
        <span className="text-primary">Sign up</span> to create your account
      </p>

      <div className="w-full flex flex-col mt-5 gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.email}
          onChange={onType}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.password}
          onChange={onType}
        />
        <Input
          type="number"
          name="phone"
          placeholder="Phone number"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.phone}
          onChange={onType}
        />
        <div className="flex items-center gap-2">
          <Input
            id="isVolunter"
            type="checkbox"
            name="isVolunteer"
            className="w-5"
            onChange={onType}
          />
          <label htmlFor="isVolunter">
            Are you a volunteer? Sign up your organisation
          </label>
        </div>

        {creds.isVolunteer && (
          <Input
            type="text"
            name="organisation"
            placeholder="Organisation"
            className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
            value={creds.organisation}
            onChange={onType}
          />
        )}

        <Button className="py-6 text-lg hover:bg-secondary" onClick={onSubmit}>
          Sign up
        </Button>
      </div>
      <div className="mt-3 flex w-full items-center gap-2">
        <div className="h-[2px] bg-secondary w-full"></div>
        OR
        <div className="h-[2px] bg-secondary w-full"></div>
      </div>
      <p className="italic text-center">
        Already have an account?
        <Link to="/login">
          <span className="text-primary"> Login Now</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
