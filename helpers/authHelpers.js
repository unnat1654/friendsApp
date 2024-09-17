import JWT from "jsonwebtoken";



export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};


export const isValidName = (str) => {
  const regex = /^[A-Za-z]+$/;
  return (regex.test(str) && str.length<26);
};


export const generateJWTToken = (_id) => {
  return JWT.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token will expire in 30 minutes
  });
};