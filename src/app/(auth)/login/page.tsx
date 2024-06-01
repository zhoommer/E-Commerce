"use client";

import { loginFunc } from "@/app/redux/features/auth/authSlice";
import { useAppDispatch } from "@/app/redux/store";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [value, setValue] = useState(0);
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
        router.replace("/");
      }
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(localStorage.getItem("user"));
  return (
    <>
      <Box
        sx={{ width: "100%" }}
        className="container w-2/6 mx-auto flex flex-col items-center"
      >
        <h3 className="font-semibold">Merhaba,</h3>
        <p className="font-normal">
          Frendyol'a giris yap veya hesap olustur, indirimleri kacirma!
        </p>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="grid grid-cols-2"
          >
            <Tab label="Giris Yap" {...a11yProps(0)} />
            <Tab label="Uye Ol" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Login;
