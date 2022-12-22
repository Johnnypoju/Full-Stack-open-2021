import { CoursePart } from "../data";
import "../index.css"


const Part = ({coursePart}: {coursePart: CoursePart}) => {
    switch(coursePart.type){
        case "normal":
            return <p>
                <tr className="bold">{coursePart.name} {coursePart.exerciseCount}</tr>
                <tr className="italic">{coursePart.description}</tr>
                </p>
        case "groupProject":
            return <p>
                <tr className="bold">{coursePart.name} {coursePart.exerciseCount}</tr>
                <tr>project exercises {coursePart.groupProjectCount}</tr>
            </p>
        case "submission":
            return <p>
                <tr className="bold">{coursePart.name} {coursePart.exerciseCount}</tr>
                <tr className="italic">{coursePart.description}</tr>
                <tr>submit to {coursePart.exerciseSubmissionLink}</tr>
            </p>
        case "special":

            return <p>
                <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br></br>
                <i>{coursePart.description}</i><br></br>
                required skills: {coursePart.requirements.map((data, index) => {
                    if (index === 0) {
                        return data
                    }
                    else {
                        return ", "+ data
                    }
                })}
                </p>
        default:
            return <div></div>
    }

}

export default Part;