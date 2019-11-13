module.exports.validateRegisterInput = (
  userName,
  email,
  passowrd,
  confirmPassword
) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid address";
    }
  }
  if (passowrd === "") {
    errors.passowrd = "Password must not be empty";
  } else if (passowrd !== confirmPassword) {
    errors.confirmPassword = "Passwords dont match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (userName, passowrd) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username must not be empty";
  }
  if (passowrd === "") {
    errors.passowrd = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
