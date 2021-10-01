
exports.firebaseAuthErrorHandler = ( err ) => {
    let errors = {};

    if ( err.code.includes("email") ) errors.email = err.message
    else if (err.code.includes("password")) errors.password = err.message
    else errors.general = err.message

    return errors;
} 