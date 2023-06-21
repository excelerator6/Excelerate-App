import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

function AvatarsUsername() {

  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: "USERNAME_UPDATE",
      payload: nameInput,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* input for user to type their name */}
        <div>
          <h3>Enter New Username</h3>
          <input
            placeholder="Username"
            value={nameInput}
            onChange={(event) => {setNameInput(event.target.value)}}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AvatarsUsername;