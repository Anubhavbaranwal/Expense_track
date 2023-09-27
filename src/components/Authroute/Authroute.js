import React from "react";
import { useSelector } from "react-redux";

const Authroute = ({ children }) => {
  const { userInfo } = useSelector((state) => state?.userRegister?.userAuth);
  if (!userInfo?.token) {
    window.location.href = "/login";
    return null;
  }
  return <div>{children}</div>;
};

export default Authroute;
