const express = require('express');
const cors = require('cors');
require('./db');
const complaintRoutes = require('./routes/complaintRoutes');
const residentRoutes = require('./routes/residentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/dashboard', dashboardRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/visitors', visitorRoutes);
app.use('/admins', adminRoutes);
app.get('/', (req, res) => {
    res.send('Society Management Backend Running');
});

app.use('/complaints', complaintRoutes);
app.use('/residents', residentRoutes);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});