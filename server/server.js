const express = require('express');
const cors = require('cors');
const pg = require('pg');


const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Login",
    password:"Surya@260604",
    port:5432,
})

db.connect();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/signup', async(req,res)=>{
    const {name, email, password} = req.body;
    try{
        const result = await db.query("INSERT INTO signup(name, email, password)VALUES($1, $2, $3) RETURNING *",[name, email, password]);
        res.status(201).json({message:"User Created Successfully", user:result.rows[0]})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query("SELECT * FROM signup WHERE email = $1 AND password = $2", [email, password]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found or incorrect credentials" });
        } else {
            res.status(200).json({ message: "Login successful", user: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})