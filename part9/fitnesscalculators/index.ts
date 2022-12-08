import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import bodyparser from 'body-parser';
import { exerciseCalculator } from './exerciseCalculator';
//import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(bodyparser.json());
app.get('/hello', (_req,res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height= Number(req.query.height);
    const weight= Number(req.query.weight);
    res.send(bmiCalculator(height, weight));
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises as Array<number>;
    console.log(daily_exercises.every( day => isNaN(day)));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);
    console.log(daily_exercises);
    if (!daily_exercises || !target) {
        if (isNaN(target)) {
            res.status(400).send({ error: 'malformatted parameters'});
        }else {
            res.status(400).send({ error: 'Some parameteres missing.'});
        }
    }
    else if (daily_exercises.length < 7) {
        res.status(400).send({ error: 'not a seven day week'});
    }
    else if (!daily_exercises.every( day => isNaN(day))) {
        res.status(400).send({ error: 'malformatted parameters'});
    }
    else {
        res.send(exerciseCalculator(daily_exercises, target));
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});