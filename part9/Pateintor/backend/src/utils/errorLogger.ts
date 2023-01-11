const errorLogger = (error: unknown) => {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
    }
};

export default errorLogger;