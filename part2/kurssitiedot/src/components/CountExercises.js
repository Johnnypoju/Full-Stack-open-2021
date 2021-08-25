import React from 'react'

const ExerciseTotal = ({props}) => {
    const exercises = props.map(exercises => exercises.exercises)
    const total = exercises.reduce((s,p) => s + p)
    return(
        <h4>
            total of {total} exercises
        </h4>
    )
}

const CountExercises = ({parts}) => {
    
    return (
        <div>
        
            <ExerciseTotal props={parts} />
            
        </div>
    )
}

export default CountExercises