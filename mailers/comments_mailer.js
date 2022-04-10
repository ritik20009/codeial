const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
   

    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'nk3850958@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        return;
    });
}