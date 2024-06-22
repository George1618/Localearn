import express from 'express';
import getExercicio from '../controllers/Controller';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/exercicio', getExercicio);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
