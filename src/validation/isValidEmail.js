const isValidEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default isValidEmail;
