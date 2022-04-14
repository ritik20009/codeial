const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');



module.exports.home = async  function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    try{
        let posts =   await Post.find({})
        .populate('user')
        .sort('-createdAt')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        let users = await User.find({});
        friendshipuser = [];
        if(req.user){
            let listforcurrentuser = await User.findById(req.user.id);
            for(let uid of listforcurrentuser.friendships){
                let frienduser = await User.findById(uid);
                friendshipuser.push(frienduser);
            }
        }
        else{
            friendshipuser = [];
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            addedfriends: friendshipuser
        });
    }catch(err){
        console.log('Error',err);
        return;
    }

       

}

// module.exports.actionName = function(req, res){}