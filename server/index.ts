import bcrypt from 'bcrypt';
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
    dob: string;
    phone_number: string;
    email: string;
    medicare_card_number: string;
    full_name_on_card: string;
    expiry_date: string;
    gender: string;
    reason_for_visit: string;
}

app.post('/api/bookings', async (req: Request<{}, {}, BookingReq>, res: Response) => {
    const { 
        patient_name, doctor_name, date, time, type, dob, phone_number, email, medicare_card_number, full_name_on_card, expiry_date, gender, reason_for_visit } = req.body;

    // hash sensitive fields
    try {
        const hashedDob = await bcrypt.hash(dob, 10);
        const hashedMedicareCardNumber = await bcrypt.hash(medicare_card_number, 12);
        const hashedFullNameOnCard = await bcrypt.hash(full_name_on_card, 10);
        const hashedExpiryDate = await bcrypt.hash(expiry_date, 10);
        const hashedPhoneNumber = await bcrypt.hash(phone_number, 10);

        const sql = 'INSERT INTO users (patient_name, doctor_name, date, time, type, dob, phone_number, email, medicare_card_number, full_name_on_card, expiry_date, gender, reason_for_visit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.run(sql, [patient_name, doctor_name, date, time, type, hashedDob, hashedPhoneNumber, email, hashedMedicareCardNumber, hashedFullNameOnCard, hashedExpiryDate, gender, reason_for_visit], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID});
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message || String(err) });
    }

});

app.listen(3000, () => console.log('Server is running on port 3000'));

