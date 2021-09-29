const isEmpty  = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

const isEmail = (email) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(email.match(regEx))return true;
    else return false;
}


const validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)){
        errors.email = 'must not be empty.';
    } else if (!isEmail(data.email)){
        errors.email = 'must be a valid email address';
    }
    
    if (isEmpty(data.displayName)) {
        errors.displayName = "Must not be empty"
    }

    if (isEmpty(data.role)) {
        errors.role = "Must not be empty"
    }

    if (isEmpty(data.password)){
        errors.password = 'Must not be empty';
    }

    if (data.password !== data.confirmPassword) errors.confirmPassword = 'pwds must match';


    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = "must not be empty";
    if (isEmpty(data.password)) errors.password = "must not be empty";

    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const validateUserDetail = (data) => {
    let errors = {};

    if (isEmpty(data.user.username)) errors.username = "must not be empty";
    
    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}


export { validateUserDetail, validateSignupData, validateLoginData };