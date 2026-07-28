import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./smiley_dale.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    patient_name TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    type TEXT NOT NULL,
    dob TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    medicare_card_number TEXT NOT NULL,
    full_name_on_card TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    gender TEXT NOT NULL,
    reason_for_visit TEXT NOT NULL
  )`);
});

export default db;