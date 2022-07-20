import React, { Component } from "react";
import { connect } from "react-redux";

class UserManager extends Component {
  state = {
    keyword: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  renderUserList = () => {
    const data = this.props.userList.filter((ele) => {
      return (
        ele.hoTen
          .toLowerCase()
          .trim()
          .indexOf(this.state.keyword.toLowerCase().trim()) !== -1
      );
    });
    return data.map((ele, index) => {
      return (
        <tr
          className={`${index % 2 === 0 ? "bg-info" : "bg-warning"}`}
          key={index}
        >
          <td>{index + 1}</td>
          <td>{ele.maSV}</td>
          <td>{ele.hoTen}</td>
          <td>{ele.phoneNumber}</td>
          <td>{ele.email}</td>
          <td>
            <button
              onClick={() => {
                this.props.dispatch({
                  type: "SET_SELECTED_USER",
                  payload: ele,
                });
              }}
              className="btn btn-success me-2 "
            >
              EDIT
            </button>
            <button
              onClick={() => {
                this.props.dispatch({
                  type: "DELETE_USER",
                  payload: ele,
                });
              }}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold bg-dark text-white">
          DANH SÁCH SINH VIÊN
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                onChange={this.handleChange}
                name="keyword"
                type="text"
                placeholder="Tìm kiếm tên sinh viên ..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ và tên</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderUserList()}</tbody>
          </table>
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

export default connect(mapStateToProps)(UserManager);
