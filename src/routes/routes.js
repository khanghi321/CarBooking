const express = require('express')
const router = express.Router()
const {UserValidator, PostValidator} = require('../validators/validators')
const {register, login, logout} = require('../controllers/UserControllers')
const {listPost, detailPost, createPost, editPost, deletePost} = require('../controllers/PostControllers')
 
function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        return res.json({err: 'You must be Logout in to Login continue'});        
    } else {
        return next();
    }
}
function requiresLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}
router.get('/posts', requiresLogin, listPost)
router.get('/post/:id',requiresLogin, detailPost)
router.post('/post/new', requiresLogin, PostValidator, createPost)
router.put('/post/:id/edit', requiresLogin, PostValidator, editPost)
router.delete('/post/:id', requiresLogin, deletePost)
router.get('/logout', requiresLogin, logout)
router.post('/register', UserValidator, register)
router.post('/login', requiresLogout, login)
module.exports = router;