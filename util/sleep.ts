const sleep = (sleepTime: number = 1500) => {
    return new Promise(resolve => setTimeout(resolve, sleepTime));
}

export default sleep;