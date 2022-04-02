const jwtConstants = require('../config/jwt-constants')
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userRepository = require('../repositories/user-repository')

const signup = async (dto) => {
    const hashedPassword = await bcryptjs.hash(dto.password, await bcryptjs.genSalt())

    //alert if the email is already registered
    // const user = await userRepository.findByEmail(email);
    const user = {
        email: dto.email,
        password: hashedPassword,
    };
    console.log("signupのuserです", user)

    const result = await userRepository.saveOne(user)
    return generateAccessToken(result.insertId.toString())
}

const signin =  async (dto) => {
    const signinDTO = {
        email: dto.email,
        password: dto.password,
    }

    //alert if the user(the email) is not registered
    const user = await userRepository.findByEmail(signinDTO.email);
    if(!user) {
        throw new Error('not registered')
    }

    const isPasswordValid = await bcryptjs.compare(dto.password, user[0].password);
    if(!isPasswordValid) throw new Error('email or password is invalid')
    
    return generateAccessToken(user[0].id)
}

//
const generateAccessToken = (id) => {
    console.log("idだよ", id)
    const accessToken = jwt.sign({ id }, jwtConstants.JWT_SECRET, { expiresIn: jwtConstants.JWT_EXPIRE_IN });
    return {
        accessToken,
        expiresIn: jwtConstants.JWT_EXPIRE_IN,
    }
}

exports.signup = signup;
exports.signin = signin;