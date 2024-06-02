"use client";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useState } from "react";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";

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
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <LoginPage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RegisterPage />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Login;
