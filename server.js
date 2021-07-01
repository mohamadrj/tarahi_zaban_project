const express = require('express');
const connectDB = require('./config//db');

connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Studio API' }));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/incomes', require('./routes/incomes'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/equipments', require('./routes/equipments'));
app.use('/api/inventorys', require('./routes/inventorys'));
app.use('/api/processs', require('./routes/processs'));
app.use('/api/forms/allforms', require('./routes/forms'));
app.use('/api/auth/allusers', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
