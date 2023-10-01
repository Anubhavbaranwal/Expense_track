import React, { useEffect } from "react";
import AccountList from "./AccountList";

import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../Redux/userSlice";

const MainDashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);
  const { loading, profile, error } = useSelector(
    (store) => store.userRegister
  );
  console.log(loading);
  return (
    <>
      {loading ? (
        <h2 className="text-center text-5xl mt-5 text-green-600">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-3xl mt-5 text-red-800">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
