const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1); // pending => resolved, fulfilled
        reject(new Error('Something goes wrong...')); //pending => rejected
    }, 2000);
});

p
    .then(result => {console.log(result)})
    .catch(error => {console.log(error.message)});