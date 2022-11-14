//  Роуты для пользователей  //
const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateProfileUpdate, validateAvatar } = require('../middlewares/validate-user');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateProfileUpdate, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
