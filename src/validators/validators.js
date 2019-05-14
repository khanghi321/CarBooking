const User = require('../models/UserModels')
 
exports.UserValidator = function(req, res, next){
    //name
    req.check('email', 'Invalid email.').isEmail();
    req.check('email', 'Email is required.').notEmpty();
    req.check('username', 'Username is required.').notEmpty();
    req.check('username', 'Username must be more than 1 characters').isLength({min:2});
    req.check('password', 'Password is required.').notEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
    req.check('password_confirm', 'Password confirm is required.').notEmpty();
    req.check('password_confirm','Password mismatch').equals(req.body.password);
 
    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}
exports.PostValidator = function(req, res, next){
    //title
    req.check('title', 'Title is required.').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({min:4, max:150});
    //content
    req.check('content', 'Write a content').notEmpty();
    req.check('content', 'Content must be between 4 to 2000 characters').isLength({min:4, max:2000});
 
    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}
 