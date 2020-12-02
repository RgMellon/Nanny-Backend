import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';
import PetsController from './app/controllers/PetsController';
import PetshopsController from './app/controllers/PetshopsController';
import ProceduresController from './app/controllers/ProceduresController';
import BannersController from './app/controllers/BannersController';
import AppointmentsController from './app/controllers/AppointmentsController';
import DetailPetshopController from './app/controllers/DetailPetshopController';
import ViewsPetshopsController from './app/controllers/ViewsPetshopsController';
import NotificationsController from './app/controllers/NotificationsController';
import OwnerPetshopController from './app/controllers/OwnerPetshopController';
import LastAppointmentController from './app/controllers/LastAppointmentController';
import FilterAppointmentController from './app/controllers/FilterAppointmentController';
import SendPushNotificationController from './app/controllers/SendPushNotificationController';
import SaveKeysPushNotificationController from './app/controllers/SaveKeysPushNotificationController';
import AppointmentDetailController from './app/controllers/AppointmentDetailController';
import ChangeStatusAppointmentController from './app/controllers/ChangeStatusAppointmentController';
import SendPushNotificationToPetshopController from './app/controllers/SendPushNotificationToPetshopController';
import PushMessageController from './app/controllers/PushMessageController';
import VerifyRegisterController from './app/controllers/VerifyRegisterController';
import UserDataController from './app/controllers/UserDataController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/session', SessionsController.store);

routes.use(authMiddleware);

routes.post('/pets', upload.single('avatar'), PetsController.store);
routes.get('/pets', PetsController.pets);

let imagesUpload = upload.fields([
  { name: 'avatar', maxCount: 5 },
  { name: 'background_image', maxCount: 8 },
]);

// routes.post('/guest', GuestController.store);

// routes.post('/petshops', imagesUpload, PetshopsController.store);
// routes.get('/petshops', PetshopsController.all);

// routes.get('/petshops/:id_petshop', PetshopsController.detail);
// routes.get('/users/petshop', OwnerPetshopController.index);

// routes.post('/petshops/views/:id_petshop', ViewsPetshopsController.store);
// routes.get('/petshops/all/views', ViewsPetshopsController.index);

// routes.get('/petshops/detail/:id_petshop', DetailPetshopController.detail);

// routes.post(
//   '/procedures/:petshop_id',
//   upload.single('avatar'),
//   ProceduresController.store
// );

// routes.get('/procedures/:petshop_id', ProceduresController.all);

// routes.delete(
//   '/procedures/:petshop_id/:procedure_id',
//   ProceduresController.delete
// );

// routes.post('/banners', upload.single('banner'), BannersController.store);
// routes.get('/banners', BannersController.all);

// routes.post('/appointments', AppointmentsController.store);
// routes.get('/appointments', AppointmentsController.get);
// routes.get('/appointments/:id', LastAppointmentController.last);
// routes.get('/appointments/detail/:id', AppointmentDetailController.index);

/*
 * Listando as notificacoes de uma loja
 */

//Notifications .IO
// routes.get('/notifications', NotificationsController.index);
// routes.put('/notifications/:id', NotificationsController.update);
// routes.delete('/notifications', NotificationsController.delete);

// routes.put('/user', UserController.update, ProceduresController.all);

//Push notifications
// routes.post('/send/notification/:id', SendPushNotificationController.send);

// routes.post(
//   '/send/notification/petshop/:petshopId',
//   SendPushNotificationToPetshopController.send
// );

// routes.get('/keys', SaveKeysPushNotificationController.get);
// routes.post('/save/keys', SaveKeysPushNotificationController.store);

// routes.put(
//   '/change/appointments/status/:id',
//   ChangeStatusAppointmentController.change
// );

// routes.post('/saves/messages/push/:petshopId', PushMessageController.save);

// routes.get('/dates/appointments/:id', FilterAppointmentController.index);

// routes.get('/pushs/notifications/', PushMessageController.all);
// routes.put(
//   '/pushs/notifications/:idNotification',
//   PushMessageController.update
// );

// routes.delete('/pushs/notifications/', PushMessageController.delete);

// routes.get('/users/verify', VerifyRegisterController.verify);
// routes.put('/info/users', UserDataController.store);
export default routes;
