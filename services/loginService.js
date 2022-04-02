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

const signin =  async (email, plainPassword) => {
    console.log("サインイン、できてます")
    console.log("emailはこれだよ", email)

    //alert if the user(the email) is not registered
    const user = await userRepository.findByEmail(email);
    if(!user) {
        throw new Error('not registered')
    }
    console.log("userのパスワード", user)

    const isPasswordValid = await bcryptjs.compare(plainPassword, user.password);
    if(!isPasswordValid) throw new Error('email or password is invalid')
    console.log("id", user.id)
    return generateAccessToken(user.id)
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

   //以下旧チャレンジ
    
    //query前にここでcontrollerで入力された元のパスワードをhash後のパスワードに変換し、その上で下のpassword部分のvaruableをhash後のパスワードにする
    // const hashedPassword = await bcryptjs.hash(plainPassword, await bcryptjs.genSalt());

    //この時点でdatabaseに保存されているhash値とは異なるhashが生成されているから、成り立たない？
    // return new Promise((resolve, reject) => {
    //     pool.query(`SELECT email, password FROM login_data`,
    //     [
    //         email,
    //         hashedPassword
    //     ],
    //     (err, result) => {
    //         if(err) {

    //             return reject(err);
    //         }
    //         return resolve(result);
    //     })
    //     const isPasswordValid = bcryptjs.compare(plainPassword, hashedPassword);//await? user?
    //     if (!isPasswordValid) throw new Error(`email or password is invalid`);
    //     generateAccessToken(email)
    //     console.log(generateAccessToken(email))