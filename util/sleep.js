const sleep = (sleepTime = 1500) => {
    return new Promise(resolve => setTimeout(resolve, sleepTime));
}

module.exports = sleep;
