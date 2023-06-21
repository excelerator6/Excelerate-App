import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
//import for material ui button and stack spacing
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function AvatarsItem() {
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={
            <Avatar
              size={100}
                // name= 'hello'
            //   variant="beam"
              src={"https://source.boringavatars.com/beam"}
            //   src={"https://source.boringavatars.com/beam"}
              />
          }
        //   colors={[
        //     "c9cbcd",
        //     "#90ee90",
        //     "#c3e3eb",
        //     "#061e45",
        //     "#3645f",
        //     "#303841",
        //   ]}
        >
          Pick me
        </Button>
      </div>
    </div>
  );
}

export default AvatarsItem;
