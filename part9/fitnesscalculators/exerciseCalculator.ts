interface trainingResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export function exerciseCalculator (daily_exercises: Array<number>, target: number) {


// calculates rating for exercises
const countRating = (averageExerciseHours: number, targetHrs: number) => {
    //ratingCount is calculated by comparing how target has been achieved
    const ratingCount = averageExerciseHours / targetHrs;
    
    switch(true) {
        case ( ratingCount >= 1): {
            return {
                rating: 3,
                ratingDescription: 'Awesome results, keep it up!'
            };
        }
        case ( ratingCount < 1 && ratingCount >= 0.7): {
            return {
                rating: 2,
                ratingDescription: 'Not too bad, but could be better.'
            };
        }
        case ( ratingCount < 0.7): {
            return {
                rating: 1,
                ratingDescription: 'You have a lot to improve on..'
            };
        }
        default : {
            return {
                rating: 0,
                ratingDescription: 'no rating'
            };
        }
    }
};

//to calculate exercise data parameter inputs are for daily exercises as an array with brackets [ ]
//and the second argument is the target (this simplifys the code by alot)
function calculateExercises(dailyExercise: Array<number>, targetHrs: number): trainingResult {

    const exerciseDays = dailyExercise.filter((day) => day !== 0);
    const exerciseHours = dailyExercise.reduce((incrementor, hour) => incrementor+hour);
    const averageExerciseHours = exerciseHours / dailyExercise.length;
    const ratingCalulation = countRating(averageExerciseHours, targetHrs);
    
    const exerciseResult: trainingResult = { 
        periodLength: dailyExercise.length,
        trainingDays: exerciseDays.length,
        success: averageExerciseHours >= targetHrs ? true : false,
        rating : ratingCalulation.rating,
        ratingDescription: ratingCalulation.ratingDescription,
        target: targetHrs,
        average: averageExerciseHours
    };



    return exerciseResult;
}
//parse incoming arguments
/*const ArgumentParser = (args: Array<string>) => {
    const exerciseDays= Number(JSON.parse(args[2]));
    
    return {
        exerciseDays: exerciseDays,
        target: Number(args[3])
    };
};*/

try {
    //const { exerciseDays, target } = ArgumentParser(process.argv);
    
    return calculateExercises(daily_exercises, target);
} catch (error:unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    return errorMessage;
 }
}