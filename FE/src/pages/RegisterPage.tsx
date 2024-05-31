import ErrorDialog from "@/components/shared/ErrorDialog";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formContent = new FormData(e.currentTarget)
    formContent.append("password1", formData.password)
    formContent.append("password2", formData.password)

    signUp.mutate(formContent)
    // Your custom submission logic here
  };

  const signUp = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/sign_up", {
        method: "POST",
        body: formData

      })
      if (res.status != 200) {
        if (res.status == 303) {
          throw new Error("Credentials don't match, pls try again");
        } else {
          throw new Error("Pls try again later or contact support");
        }
      }
      return res;
    }
  })



  return (
    <>
      <div className="h-screen bg-slate-100 flex flex-col justify-center items-center">
        <div className="flex w-80 flex-col justify-center  bg-white px-4 rounded-lg py-5 border">
          <div className="w-44 self-center">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <h1 className="self-center font-semibold text-xl mt-2">Sign Up</h1>
          {/* <p className="">After register pls verify confirm your email</p> */}
          <form onSubmit={handleSubmit} >
            <Label className="mt-2">Email:</Label>
            <Input required={true} onChange={handleInputChange} name="email" type="email" className="mt-1"></Input>
            <Label className=" mt-2">Password:</Label>
            <Input required={true} onChange={handleInputChange} name="password" type="password" className="mt-1"></Input>
            <Button type="submit" className="mt-2 w-full">
              Sign Up
            </Button>
          </form>
        </div>
        {signUp.isError && (
          <ErrorDialog open={true} message={signUp.error?.message} />
        )}
      </div>
    </>
  );
}