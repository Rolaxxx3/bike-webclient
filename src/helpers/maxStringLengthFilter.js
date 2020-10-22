const maxStringLengthFilter = (str, length) => {
    let result = str.slice(0, length);
    if (str.length > length) result += '...'
    return result;
}

export default maxStringLengthFilter