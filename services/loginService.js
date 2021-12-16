const initPool = require('../db/connection');
const jwtConstants = require('../config/jwt-constants')
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const pool = initPool();

const signup = async (email, password) => {
    console.log("signup")
    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt());
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO login_data (email, password) VALUES (?, ?)`,
        [
            email,
            hashedPassword
        ],
        (err, result) => {
            if(err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
    .then( () => {
        return addAccessToken(email)
        })
}

const signin =  async (email, plainPassword) => {
    //メアドの確認
    console.log("success")
    return new Promise((resolve, reject) => {
        pool.query(`SELECT email, password FROM login_data where email = ?`,
        [
            email
        ],(err, result) => {
            if(!email) {
                return reject(err);
            }
            return resolve(result);
        })
    //パスワードの確認
    })
    .then( async (result) => {

    console.log("success")
    const isPasswordValid = await bcryptjs.compare(plainPassword, result[0].password);//await? user?
    console.log(isPasswordValid)
    if (!isPasswordValid) throw new Error(`email or password is invalid`);
    return addAccessToken(email)
    })
}

//
const addAccessToken = (email) => {
    const accessToken = jwt.sign({ id: email }, jwtConstants.JWT_SECRET, { expiresIn: jwtConstants.JWT_EXPIRE_IN });
    return {
        accessToken,
        expiresIn: jwtConstants.JWT_EXPIRE_IN,
    }
}

//
// module.exports = signup, signin;
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
    //     addAccessToken(email)
    //     console.log(addAccessToken(email))