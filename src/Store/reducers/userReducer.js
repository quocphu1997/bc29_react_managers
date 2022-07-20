const DEFAULT_STATE = {
  userList: [
    {
      id: "1",
      maSV: "12",
      hoTen: "Man Ng A",
      phoneNumber: "085512123123",
      email: "man.nguyen@gmail.com",
    },
    {
      id: "2",
      maSV: "23",
      hoTen: "Man Ng B",
      phoneNumber: "085512123123",
      email: "man.nguyen@gmail.com",
    },
  ],
  selectedUser: null,
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case "ADD_SV": {
      const data = [...state.userList];
      data.push({ ...payload, id: Date.now() });
      state.userList = data; // gan data vừa push vào state.userList
      return { ...state };
    }
    case "SET_SELECTED_USER": {
      // state.selectedUser = payload;
      return { ...state, selectedUser: payload };
    }
    case "UPDATE_USER": {
      //cách 1
      const data = [...state.userList];
      const indx = data.findIndex((ele) => ele.id === payload.id);
      if (indx !== -1) {
        data[indx] = payload;
      }

      //cách 2 // state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele);
      // state.selectedUser = null;
      // return {...state}
      return { ...state, userList: data, selectedUser: null };
    }
    case "DELETE_USER": {
      //cách 1
      const data = [...state.userList];
      const indx = data.findIndex((ele) => ele.id === payload.id);
      if (indx !== -1) {
        data.splice(indx, 1);
      }

      //cách 2 // state.userList = state.userList.filter(ele => ele.id !== payload.id );
      // return {...state}
      return { ...state, userList: data };
    }
    default:
      return state;
  }
};
