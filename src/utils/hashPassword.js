import bycrypt from "bcrypt";

const hashPassword = async (password) => {
    const saltRounds = 10;

    const hashedPassword = await bycrypt.hash(password, saltRounds);

    return hashedPassword;
};

export default hashPassword;