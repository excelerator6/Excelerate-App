import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";



function* putAvatarName(action) {
  try {
    const updateAvatarName = action.payload;
    console.log("updateAvatarName******", updateAvatarName);

    const response = yield axios({
      method: "PUT",
      url: `/api/avatars/${updateAvatarName.id}`,
      data: updateAvatarName,
    });
    yield put({
      type: "FETCH_AVATAR",
    });
  } catch (error) {
    console.log("putAvatarName axios PUT failed!!", error);
  }
}

function* avatars() {
  yield takeLatest("FETCH_AVATAR", getAvatar);
  yield takeLatest("UPDATE_AVATAR_NAME", putAvatarName);
}

export default avatars;