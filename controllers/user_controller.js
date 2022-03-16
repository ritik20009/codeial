const User = require('../models/user');

module.exports.profile = function(req,res){
    
    return res.render('user_profile', {
        title: "user"
    });
}
// render the signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title: "Codeial | signUp"
    });
}

// render the signin page
module.exports.signIn = function(req,res){

    return res.render('user_sign_in',{
        title: "Codeial | signIn"
    });
}

//get the sign up data

module.exports.create = function(req,res){
    
    if(req.body.password!=req.body.confirm_password){

        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('error in creating account');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating account');
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    //TODO LATER
}