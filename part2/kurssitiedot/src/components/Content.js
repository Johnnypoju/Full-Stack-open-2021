import React from 'react'
import Part from './Part'
import CountExercises from './CountExercises'



const Content = ({parts}) => {
    return (
        <div>
            {parts.map(parts => 
                <Part key={parts.id} parts={parts}/>
            )}
            <CountExercises parts={parts} />
        </div>
    )
}

export default Content