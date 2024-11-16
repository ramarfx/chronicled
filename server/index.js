import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/discord/message', async (req, res) => {
    try {
        // Pastikan file diunggah
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.files.file;

        // Siapkan form-data
        const formData = new FormData();
        formData.append('file', file.data, file.name);
        formData.append('content', req.body.content || '');

        const response = await axios.post(
            "https://discord.com/api/v10/channels/1146739358532108291/messages",
            formData,
            {
                headers: {
                    Authorization: `Bot MTMwNzM2OTY4ODgxNjI5MTg4MQ.Gaox59.Rhk9E5ux7J-ra3rxm94jNcqKag3X4fC99mviZw`,
                    ...formData.getHeaders(), // Otomatis menambahkan header form-data
                },
            }
        );

        // Kirim respons dari Discord API
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.response?.data || { error: "An error occurred" });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
});
