import express from 'express';

const app = express();

// entry index enpoints
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'This is the index page endpoint'
    }).status(200);
})

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server is listen on PORT ${PORT}`);
})