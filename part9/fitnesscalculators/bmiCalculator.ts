export interface bmiMessage {
    weight: number,
    height: number, 
    bmi: string
}


export function bmiCalculator(height: number, weight: number) {

    /*const parseArguments = ( args: Array<string>) => {
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
        {
            return {
                height: Number(args[2]),
                weight: Number(args[3])
            }
        }
        return {
            height: 0,
            weight: 0
        }
    }*/
    
    const calculateBmi = (height: number, weight: number): number =>{
        const heightInMeters  = height/100;
        const bmi = weight/(heightInMeters**2);
        return bmi;
    
    };
    
    const bmiValuation = (height: number, weight: number) => {
        const bmi = calculateBmi(height, weight);
        let bmiMessage = {
            weight: weight,
            height: height,
            bmi: ''
        };
        switch(true){
            case (bmi < 16): {
                bmiMessage = { ...bmiMessage, bmi: 'Underweight ( Sever thinnes)'};
                break;
            }
            case (/*bmi >= 16 && */bmi <= 16.9): {
                bmiMessage = { ...bmiMessage, bmi: 'Underweight (Moderate thinness)'};
                break;
            }
            case (bmi <= 18.4): {
                bmiMessage = { ...bmiMessage, bmi: 'Underweight (Mild thinness)'};
                break;
            }
            case (bmi <= 24.9): {
                bmiMessage = { ...bmiMessage, bmi: 'Normal range (healthy weight)'};
                break;
            }
            case (bmi <= 29.9): {
                bmiMessage = { ...bmiMessage, bmi: 'Overweight (Pre-obese)'};
                break;
            }
            case (bmi <= 34.9) : {
                bmiMessage = { ...bmiMessage, bmi: 'Obese (Class I)'};
                break;
            }
            case (bmi <= 39.9) : {
                bmiMessage = { ...bmiMessage, bmi: 'Obese (Class II)'};
                break;
            }
            case (bmi >= 40) : {
                bmiMessage = { ...bmiMessage, bmi: 'Obese (Class III)'};
                break;
            }
            default: {
                return bmiMessage;
            }
        }
        console.log(bmiMessage);
        return JSON.stringify(bmiMessage);
        
    };
    
    try {
        //const { height, weight } = parseArguments(process.argv);
        return bmiValuation(height, weight);
    }
    catch (error:unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return errorMessage;
        console.log(errorMessage);
     }
}

