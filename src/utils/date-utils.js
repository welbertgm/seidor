exports.LocalDateTime = () => {
    let dNow = new Date();
    let localdate = dNow.getFullYear() + '-' +
        (dNow.getMonth() + 1) + '-' +
        dNow.getDate() + ' ' +
        dNow.getHours() + ':' +
        dNow.getMinutes() + ':' +
        dNow.getSeconds();
    return localdate;
}