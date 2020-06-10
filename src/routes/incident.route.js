import express from 'express';
import connect from 'connect-multiparty';
import AuthMiddleware from '../middlewares/auth.middleware';
import IncidentController from '../controllers/incidentController';
import IncidentMiddleware from '../middlewares/incident.middleware';

const router = express.Router();
const connection = connect();

router.post('/create', AuthMiddleware.verifyToken, connection, IncidentMiddleware.validate, IncidentController.createIncident);
router.get('/viewAll', AuthMiddleware.verifyToken, IncidentController.getAll);
router.delete('/:id/delete', IncidentMiddleware.param, AuthMiddleware.verifyToken, IncidentController.removeIncident);

export default router;