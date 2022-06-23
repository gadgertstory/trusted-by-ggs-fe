import React, { useEffect,useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import UserService from "../../middleware/user";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // useEffect(() => {
  //   console.log('Profile currentUser',currentUser)
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setData(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //         setData(_content);
  //     }
  //   );
  // }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.data.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> 
        {currentUser.access_token}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.data.email}
      </p>
    </div>
  );
};

export default Profile;
