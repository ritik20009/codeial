const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.addfriend = async function(req,res){

    try{
        let addedAsFriend = await User.findById(req.user.id);
        let unfriend = false;

        // check if the user's friendship already exists

        let existingFriend = await Friendship.findOne({
            from_user: req.user.id,
            to_user: req.body.friendUserId
        });

        let existingFriend2 = await Friendship.findOne({
            from_user: req.body.friendUserId,
            to_user: req.user.id
        });

        // if friendship exists between two user's then we are deleting or unfriending the user

        if(existingFriend || existingFriend2){

            // removing the friend from the friendlist of the user

            addedAsFriend.friendships.pull(req.body.friendUserId);
            addedAsFriend.save();

            // removing the friend from friendlist to_user

            let to_user = await User.findById(req.body.friendUserId);
            to_user.friendships.pull(req.user.id);
            to_user.save();

            if(existingFriend){
                await Friendship.findByIdAndDelete(existingFriend._id);
            }else{
                await Friendship.findByIdAndDelete(existingFriend2._id);
            }

            unfriend=true;
        }
        else{

            // creating new friendship between two users

            let addNewFriend = await Friendship.create({
                from_user: req.user.id,
                to_user: req.body.friendUserId
            });

            let user = await User.findById(req.user.id);
            user.friendships.push(req.body.friendUserId);
            user.save();

            let to_user = await User.findById(req.body.friendUserId);
            to_user.friendships.push(req.user.id);
            to_user.save();
        }

        return res.redirect('/');
    }catch(error){
        console.log('error', error);
    }
}