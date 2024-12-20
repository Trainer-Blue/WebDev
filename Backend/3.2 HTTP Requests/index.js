import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
}
);

app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>Company: XYZ</p><p>Location: Somewhere</p>');
}   
);

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><p>Email: abc</p><p>Phone: 123</p>');
}
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});