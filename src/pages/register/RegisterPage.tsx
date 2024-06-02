import React, { useState } from "react";
import { useAppDispatch } from "@/app/redux/store";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { registerFunc } from "@/app/redux/features/auth/singUpSlice";
import Swal from "sweetalert2";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rmail, setRMail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [gender, setGender] = useState("");
  const [selectedButton, setSelectedButton] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSignup = async () => {
    let postData = {
      email: rmail,
      gender: gender,
      passwordHash: rpassword,
    };

    const response = await dispatch<any>(registerFunc(postData));
    if (response.payload?.access_token) {
      Swal.fire({
        position: "top-right",
        icon: "success",
        title: "Uyeliginiz olusturuldu.",
        text: "Simdi friendyol'un avantajlarindan faydalanabilirsiniz.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
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
              setRMail(e.target.value);
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
                setRpassword(e.target.value);
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

        <div className="flex mt-2">
          <button
            className={
              selectedButton === "kadin"
                ? "border border-purple-800 rounded p-3 flex-1"
                : "border rounded p-3 flex-1"
            }
            onClick={() => {
              setSelectedButton("kadin");
              setGender("KADIN");
            }}
          >
            Kadin
          </button>
          <button
            className={
              selectedButton === "erkek"
                ? "border border-purple-800 rounded p-3 flex-1"
                : "border rounded p-3 flex-1"
            }
            onClick={() => {
              setSelectedButton("erkek");
              setGender("ERKEK");
            }}
          >
            Erkek
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="border rounded p-3 bg-purple-700 text-white w-96 hover:bg-purple-500"
            onClick={handleSignup}
          >
            Uye Ol
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
