import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen( port, () => console.log(`Server is up and running on port ${port}`));

export default app;