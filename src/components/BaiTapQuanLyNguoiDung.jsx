import React, { Component } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import UserManager from "./UserManager/UserManager";



export default class BaiTapQuanLyNguoiDung extends Component {
  render() {
    return (
      <div>
        <div className="w-75 mx-auto mt-5">
          <RegisterForm />
          <UserManager />
        </div>
      </div>
    );
  }
}
