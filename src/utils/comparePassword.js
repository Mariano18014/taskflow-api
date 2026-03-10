import bycrypt from "bcrypt";

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bycrypt.compare(password, hashedPassword);

    return isMatch;
};

export default comparePassword;