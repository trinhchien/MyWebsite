import { app, port } from '../config/app.js';
import { connectDb } from '../config/db.js';
import { routers } from './routers.js';

connectDb();

// app.get('/', (req, res, next) => {
//     res.send('hello world');
// });
app.use('/api', routers);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
