import React, { useState } from "react";
import { useAppDispatch } from "@/app/redux/store";
import { loginFunc } from "@/app/redux/features/auth/authSlice";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    let postData = {
      email: mail,
      passwordHash: password,
    };
    dispatch(loginFunc(postData)).then((res: any) => {
      if (res.payload.access_token) {
        localStorage.setItem("token", res.payload.access_token);
        localStorage.setItem("user", res.payload.user);
        window.location.href = "/";
      }
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="border p-3">
        <div className="flex flex-col mx-auto">
          <label className="ms-2 mb-2">E-Posta</label>
          <input
            type="text"
            className="border rounded p-3 w-96"
            placeholder="E-posta adresinizi giriniz"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <label className="ms-2 mb-2 mt-3">Sifre</label>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              size="small"
              placeholder="Sifrenizi giriniz"
              className="p-1 w-96"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end" className="me-3">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="flex justify-end p-3">
          <Link href={"#"} className="underline">
            Sifremi unuttum
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            className="border rounded p-3 bg-purple-700 text-white w-96 hover:bg-purple-500"
            onClick={handleSubmit}
          >
            Giris Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
