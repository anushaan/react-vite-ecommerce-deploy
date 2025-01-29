import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUserAction } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const intialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData)).then((data) => {
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive'    
        })
      }
    })
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont have an account 
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign In"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;