const nodemailer = require('nodemailer')
const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
const app = express();
const PORT = 8000

const staticpath = path.join(__dirname, '../public')
app.use(express.static(staticpath))

var value;
app.get('/', (req, res) => {
    res.send("Hi")
})
app.get('/about', (req, res) => {
    res.send("Hi from About")
})

app.get('/form_submit', (req, res) => {
    value = req.query.Email;
    res.send("Send Succesfully")
    main(value);

})

app.listen(PORT, () => {
    console.log("Server was Started")
})

async function main(value) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "sahilkumbharkar57@gmail.com",
            pass: "ozlk nqtf dsgm cubl",
        },
    });

    const content = {
        from: 'sahilkumbharkar57@gmail.com',
        to: `${value}`,
        subject: "   THANK YOU !!   ",
        text: "   Thank you For Visiting Our Website !!",
    }

    const info = await transporter.sendMail(content);
    console.log("Succesfully Sent")
}
module.exports.handler = serverless(app);


