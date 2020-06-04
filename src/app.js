import express from 'express';
import bodyparser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyparser.json());

const port = process.env.PORT || 5000;

app.listen( port, () => console.log(`Server is up and running on port ${port}`));

app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'welcome to Broadcaster App!!'
    });
  });

  require('./index.js')(app);

export default app;