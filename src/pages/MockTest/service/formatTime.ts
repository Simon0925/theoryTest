

export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let result = '';
    if (minutes > 0) {
        result += `${minutes}m`;
    }
    if (seconds > 0) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `${seconds}s`;
    }
    if (result === '') {
        result = '0s';
    }

    return result;
};