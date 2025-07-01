import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.js';
import pharmacyRoutes from './routes/pharmacy.js';
import categoryRoutes from './routes/category.js';
import medicineRoutes from './routes/medicine.js';
import discountRoutes from './routes/discount.js';
import prescriptionRoutes from './routes/Prescription.js';
import ordersRoutes from './routes/orders.js';
import paymentsRoutes from './routes/payments.js';
import pharmacyPrescriptionsRoutes from './routes/pharmacyPrescriptions.js';
import adminOrdersRoutes from './routes/adminOrders.js';
import adminPaymentsRoutes from './routes/adminPayments.js';
import dashboardRoutes from './routes/dashboard.js';
import newsletterRoutes from './routes/newsletter.js';
import customerOrderRoutes from './routes/customerOrder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/TopCategories', express.static(path.join(__dirname, 'public/TopCategories')));

app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/pharmacy-prescriptions', pharmacyPrescriptionsRoutes);
app.use('/api/admin/orders', adminOrdersRoutes);
app.use('/api/admin/payments', adminPaymentsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/customer-orders', customerOrderRoutes);

mongoose.connect('mongodb+srv://xasand519:5Yc2VlhZ6n9iVV7b@cluster0.6cladvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
