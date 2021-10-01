const isEmpty  = (string) => {
    if(string.trim() === '') return true;
    else return false;
}



const validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = "must not be empty";
    if (isEmpty(data.password)) errors.password = "must not be empty";

    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};




export { validateLoginData };