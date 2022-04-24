const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Friendship = require('../models/friendship');

module.exports.profile = async function(req, res){

    let user = await User.findById(req.params.id);
    let isfriendOrNot = await User.findById(req.user.id);
    const friendOrNot = user.friendships.find((item) => item == req.user.id);
    
    return res.render('user_profile', {
        title: 'user profile',
        profile_user: user,
        friendOrNot: friendOrNot
    });

}

module.exports.getlist = async function(req,res){

    let user = await User.find({});

    return res.render('allusers',{
        title: "list of all users",
        get_users: user
    });
}

module.exports.update = async function(req,res){

    if(req.user.id==req.params.id){

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('*****Multer Error: ',err)};
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });
        } catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{

        req.flash('error', 'UnAuthorized');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){

    // if the user is signed in already and tries to open the signup page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    // if the user is signed in already and tries to open the signup page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    req.logout();
    req.flash('success','you have logged out');
    return res.redirect('/');
}