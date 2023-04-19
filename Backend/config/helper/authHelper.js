import bcrypt from "bcrypt";

export let hashPassword = async (password) => {
  try {
    let saltRounds = 10;
    let hashedPassword = bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export let comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
