import express from 'express';

const port = 3000;

const app = express();
const d = new Date();
let day = d.getDay();
var weekday = 'Hey, it is a weekday! work hard!';
var weekend = 'Hey, it is the weekend! relax!';

var message = (day == 0 || day == 6) ? weekend : weekday;

app.get('/', (req, res) => {
    res.render('index.ejs', 
        { msg: message});
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);