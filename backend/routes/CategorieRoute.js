const express =  require('express');
const router  = express.Router();
const controller = require('../controllers/CategorieControllers');


router.get('/', controller.getAll)

router.get('/:id', controller.getbyId)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)



module.exports = router;