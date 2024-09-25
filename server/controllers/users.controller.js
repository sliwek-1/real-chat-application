import { connection } from "../connection.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

connection.connect((err) => {
    if(err) console.log("Something went wrong");
})

dotenv.config();

export async function signup(req, res) {
    const { firstname, lastname, login, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const isInDatabase = (email, login) => {
        return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM users WHERE email=? AND login=?`, [email, login], (err, result, fields) => {
                    if(err) {
                        reject(err)
                    }
                    resolve(result)
                })
        })
    }

    const result = await isInDatabase(email, login)
    console.log(result.length, result)
    try {
        if(result.length == 0) {
            connection.query("INSERT INTO users(firstname, lastname, login, age, email, passwd) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, login, age, email, hashedPassword], (err, result, fields) => {
                if(err) { 
                    console.log("Nie Udało się dodać nowego użytkownika do bazy danych");   
                    return res.status(500).send( { info: "Nie Udało się dodać nowego użytkownika do bazy danych" })
                }
                console.log("Dodano nowego użytkonika do bazy danych"); 
                return res.status(200).send({info: "Dodano nowego użytkonika do bazy danych"})
            })
        } else {
            console.log("Użytkownik już jest w baziedanych");
            return res.status(500).send("Użytkownik już jest w baziedanych")
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send("coś poszło nie tak " + error)
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    const isThisUserExist = (email) => {
        return new Promise((resolve,reject) => {
            connection.query("SELECT login, email, passwd FROM users WHERE email = ?", [email], (err, request, fields) => {
                if(err) {
                   reject(err)
                }
                resolve(request)
            })
        })
    }

    const isPasswordValid = async (enteredPassword, passwordFromDatabase) => {
        try {
            let isMatch = await bcrypt.compare(enteredPassword, passwordFromDatabase);
            return isMatch;
        } catch (error) {
            console.log(error)
        }
    }

    try {
        const result = await isThisUserExist(email);
        
        if(result.length > 0) {
            const isPasswordCorrect = await isPasswordValid(password, result[0].passwd)
            if(isPasswordCorrect) {
                const user = {email: result[0].email, password: result[0].passwd, login: result[0].login}
                const accessToken = jwt.sign(user, process.env.SECRET_KEY);
                return res.status(200).send({
                    accessToken: accessToken, 
                    email: result[0].email, 
                    password: result[0].passwd,
                    login: result[0].login
                });
            } else {
                return res.status(500).send("Something is wrong with password");
            }
        } else {
            return res.status(500).send("Coś poszło nie tak");
        }
    } catch(error) {
        throw error;
    }
}

export function logout(req, res) {
    
}

export async function getUser(req, res) {
    const {email, password, accessToken} = req.body;

        const getUserFromDatabase = (email, password) => {
            return new Promise((resolve, reject) => {
                connection.query("SELECT id, firstname, lastname, login, age, email FROM users WHERE email=? AND passwd=?", [email, password], (err, result, fields) => {
                    if(err) {
                        reject("Something went wrong");
                    }
        
                    resolve(result)
                })
            })
        }
    
        try {
            const result = await getUserFromDatabase(email, password);
            const userDataToSend = {
                inprogress: false,
                error: "",
                user: {
                    id: result[0].id,
                    firstname: result[0].firstname,
                    lastname: result[0].lastname,
                    login: result[0].login,
                    age: result[0].age,
                    email: result[0].email,
                    accessToken: accessToken,
                }
            }
            if(result.length > 0) {
                res.status(200).send(userDataToSend)
            } else {
                res.status(401).send("Someting went wrong")
            }
        } catch (error) {
            res.status(401).send(result)
        }
}

export async function getAllUsers(req, res) {
    try {   
        const sender = req.user.login;

        const getUsers = (sender) => {
            return new Promise((resolve, reject) => {
                connection.query("SELECT firstname, lastname, login FROM users WHERE NOT login = ?", [sender], (err, result, fields) =>{
                    if(err) reject(err);
                    resolve(result);
                })
            })
        }
        
        const result = await getUsers(sender);
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(500).send('Coś poszło nie tak');
        }
    } catch (error) {   
        console.log(error);
    }
}
