import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT;

const startServer = async () => {
    await connectDB();

    const server =app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
        console.error('❌ Error starting the server:', error);
        process.exit(1);
    });
}

startServer();