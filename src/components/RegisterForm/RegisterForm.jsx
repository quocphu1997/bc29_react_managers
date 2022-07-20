import React, { Component, createRef } from "react";
import { connect } from "react-redux";

const DEFAULT_VALUES = {
  id: "",
  maSV: "",
  hoTen: "",
  phoneNumber: "",
  email: "",
};

class RegisterForm extends Component {
  state = {
    values: DEFAULT_VALUES,
    errors: {
      id: "",
      maSV: "",
      hoTen: "",
      phoneNumber: "",
      email: "",
    },
  };

  formRef = createRef();
  // life cycle
  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedUser &&
      currentState.values.id !== nextProps.selectedUser.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      //thay đổi vùng chứa mới object state nên dùng ...spread để lưu cái mới và giữ cái cũ
      values: {
        ...this.state.values, //giữ giá trị cũ
        [name]: value, // thêm giá trị mới vd values:{...spread,newValue}
      },
    });
    // console.log({[name]:value});
  };
  /////////////
  ///////////////
  //////////////
  handleSubmit = (event) => {
    event.preventDefault(); // tránh reload form
    // console.log(this.state);
    console.log(event.target.checkValidity());

    //duyệt object là for in
    for (const key in this.state.errors) {
      const messageErr2 = this.state.errors[key];
      if (messageErr2 || !event.target.checkValidity()) {
        return;
      }
    }

    // dispatch
    if (this.props.selectedUser) {
      this.props.dispatch({
        type: "UPDATE_USER",
        payload: this.state.values,
      });
    } else {
      this.props.dispatch({
        type: "ADD_SV",
        payload: this.state.values,
      });
    }
    this.setState(
      {
        values: DEFAULT_VALUES,
      },
      () => {
        // bắt render lại lần nữa
        this.forceUpdate();
      }
    );
    // cach 2
    // this.props.dispatch({
    //   type: this.props.selectedUser ? "UPDATE_USER" : "ADD_SV",
    //   payload: this.state.values,
    // });
  };

  //////////
  ///////////
  ///////////
  handleBlur = (event) => {
    const {
      name,
      title,
      minLength,
      maxLength,
      validationMessage,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;
    // console.log(`name: ${name}: ${validationMessage}`);
    // validationMessage sẽ không thể tự custom message nên ta sử dụng  biến riêng

    let messageErr = "";
    if (patternMismatch) {
      messageErr = `${title} sai kiểu định dạng`;
    }
    if (tooLong || tooShort) {
      messageErr = `${title} nhập từ ${minLength} tới ${maxLength} ký tự`;
    }
    if (valueMissing) {
      messageErr = `${title} cần được nhập`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: messageErr,
      },
    });
  };
  ///////////
  ///////
  ///////////

  render() {
    // bóc tách object không cho phép null nên cần trả giá trị object = {rỗng}
    const { maSV, hoTen, phoneNumber, email } = this.state.values || {};
    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  {/* mã sinh viên */}
                  <input
                    required={true}
                    name="maSV"
                    title="Mã sinh viên"
                    maxLength={3}
                    value={maSV}
                    pattern="^[0-9]+$"
                    onChange={(event) => {
                      this.handleChange(event);
                    }}
                    type="text"
                    className="form-control"
                    onBlur={(event) => {
                      this.handleBlur(event);
                    }}
                  />
                  {this.state.errors.maSV && (
                    <span className="text-danger">
                      {this.state.errors.maSV}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ và Tên</label>
                  {/* Họ và tên */}
                  <input
                    required={true}
                    minLength={4}
                    maxLength={30}
                    name="hoTen"
                    value={hoTen}
                    pattern={
                      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
                    }
                    title="Họ và tên"
                    onChange={(event) => {
                      this.handleChange(event);
                    }}
                    type="text"
                    className="form-control"
                    onBlur={(event) => {
                      this.handleBlur(event);
                    }}
                  />
                  {this.state.errors.hoTen && (
                    <span className="text-danger">
                      {this.state.errors.hoTen}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  {/* Số điện thoại */}
                  <input
                    required={true}
                    name="phoneNumber"
                    title="Số điện thoại"
                    value={phoneNumber}
                    pattern="^[0-9]+$"
                    onChange={(event) => {
                      this.handleChange(event);
                    }}
                    type="text"
                    className="form-control"
                    onBlur={(event) => {
                      this.handleBlur(event);
                    }}
                  />
                  {this.state.errors.phoneNumber && (
                    <span className="text-danger">
                      {this.state.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  {/* Email */}
                  <input
                    required={true}
                    name="email"
                    title="Email"
                    value={email}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    onChange={(event) => {
                      this.handleChange(event);
                    }}
                    type="text"
                    className="form-control"
                    onBlur={(event) => {
                      this.handleBlur(event);
                    }}
                  />
                  {this.state.errors.email && (
                    <span className="text-danger">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={!this.formRef.current?.checkValidity()}
              className="btn btn-success mt-2"
            >
              Thêm sinh viên
            </button>
            {/* <button type="reset" className="btn btn-outline-dark mt-2 ms-2">
              RESET
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  };
};
export default connect(mapStateToProps)(RegisterForm);
