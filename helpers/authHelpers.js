import JWT from "jsonwebtoken";



export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};


export const generateJWTToken = (_id) => {
  return JWT.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token will expire in 30 minutes
  });
};