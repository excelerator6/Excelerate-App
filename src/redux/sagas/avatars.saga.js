import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* putAvatarName(action) {
  try {
    const avatarNewName = action.payload;

    const response = yield axios({
      method: "PUT",
      url: `/api/avatars/`,
      data: { avatarNewName },
    });
    yield put({
      type: "FETCH_USER",
    });
  } catch (error) {
    console.log("putAvatarName axios PUT failed!!", error);
  }
}

function* avatars() {
  yield takeLatest("UPDATE_AVATAR_NAME", putAvatarName);
}

export default avatars;
