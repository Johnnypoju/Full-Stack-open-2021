import { healthCheckRating } from "../types";


const healthRatingColor = (rating: healthCheckRating) => {
    switch(rating) {
        case 0:
            return '#4caf50';
        case 1:
            return '#ffeb3b';
        case 2: 
            return '#ff9800';
        case 3:
            return '#b71c1c';
        default:
            return '#9e9e9e';

    }
};

export default healthRatingColor;