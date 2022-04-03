const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/comments');


module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
          let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            req.flash('success', 'comment posted');
            post.comments.push(comment);
            post.save();

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'comment posted');
            res.redirect('/');  
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}

module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postid = comment.post;

            comment.remove();

            req.flash('success','comment deleted');
            
            let post =  await Post.findByIdAndUpdate(postid, { $pull: {comments: req.params.id}});

            return res.redirect('back');
        } else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}