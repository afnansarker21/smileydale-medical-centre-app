import cors from 'cors';
import express, { Request, Response } from 'express';
import db from './database';

const app = express();
app.use(cors());
app.use(express.json());

interface BookingReq {
    patient_name: string;
    doctor_name: string;
    date: string;
    time: string;
    type: string;
}

app.post('/api/bookings', (req: Request<{}, {}, BookingReq>, res: Response) => {
    const { patient_name, doctor_name, date, time, type } = req.body;
    const sql = 'INSERT INTO users (patient_name, doctor_name, date, time, type) VALUES (?, ?, ?, ?, ?)';

    db.run(sql, [patient_name, doctor_name, date, time, type], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID});
    });

});

app.listen(3000, () => console.log('Server is running on port 3000'));

