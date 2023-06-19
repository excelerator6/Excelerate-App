import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

//test run for avatars
import Avatars from "../Avatars/Avatars";

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>

        <Avatars />
      </div>
    </div>
  );
}

export default AboutPage;
