import { CoursePart } from "../data";
import Part from "./Part";

const Content = ({courseParts}: {courseParts: Array<CoursePart>}): JSX.Element => {
    if (!courseParts){
        return <div> </div>
    }
    console.log(courseParts.map((data) => data))
    return <div>{courseParts.map((data) => {
        
        return <Part key={data.name} coursePart={data}/>
    }
    )}</div>
}
export default Content;