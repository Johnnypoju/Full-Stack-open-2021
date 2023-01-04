import { Male, Female} from "@mui/icons-material";
import { Gender } from "../types";

const GenderReveal = ({gender}: {gender: Gender}) => {
    switch (gender) {
        case "male":
            return (<Male />);
        case "female":
            return (<Female />);
        case "other": 
            return (<div></div>);
        default: 
            return (<div></div>);
    }
};

export default GenderReveal;