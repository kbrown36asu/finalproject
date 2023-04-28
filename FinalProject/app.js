const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl="mongodb+srv://klbrow36:PlopGop!024@cluster0.xq2bpal.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {console.log("Connected to database"); 
}).catch(e => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const {fname, lname, email, password = req.body} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.send({error: "User Exists"});
        }
        await User.create({
            fname: fname,
            lname: lname,
            email: email,
            password: encryptedPassword,
        });
        res.send({status: "OK"});
    } catch (error) {
        res.send({status: "error"});
    }
}); 


app.listen(5000, () => {
    console.log("Server started")
});

