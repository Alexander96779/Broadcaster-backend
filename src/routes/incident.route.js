import express from 'express';
import connect from 'connect-multiparty';
import AuthMiddleware from '../middlewares/auth.middleware';
import IncidentController from '../controllers/incidentController';
import IncidentMiddleware from '../middlewares/incident.middleware';

const router = express.Router();
const connection = connect();
router.post('/create', AuthMiddleware.verifyToken, connection, IncidentMiddleware.validate, IncidentController.createIncident);

export default router;