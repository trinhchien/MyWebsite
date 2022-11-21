import { app, port } from '../config/app.js';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on http:localhost:${port}`);
});
