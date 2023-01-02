import { Male, Female} from "@mui/icons-material";
import { Gender } from "../types";

const GenderReveal = ({gender}: {gender: Gender}) => {
    switch (gender) {
        case 0:
            return (<Male />);
        case 1:
            return (<Female />);
        case 2: 
            return (<div></div>);
        default: 
            return (<div></div>);
    }
};

export default GenderReveal;