//  Общий роутер  //
const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateUserCreate } = require('../middlewares/validate-user');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const NoDataError = require('../utils/errors/no-data-error');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUserCreate, createUser);
router.post('/signout', logout);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
//  router.use('/signout', logout);  //

router.use('*', (req, res, next) => next(new NoDataError('По этому адресу ничего не найдено')));
router.use((req, res, next) => {
  next(new UnauthorizedError('Для доступа требуется авторизация'));
});

module.exports = router;
