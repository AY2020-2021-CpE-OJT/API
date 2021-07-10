const express = require ('express');
const router = express.Router();
const Post = require ('../Models/post');

//gets back all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

//submits post
router.post('/create', async (req, res) => {
    
    const post = new Post({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        phonenumbers: req.body.phonenumbers
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);

    }catch(err){
        res.json({message: err});

    }
});

//specific post

router.get('/get/:postId', async(req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }

});

//Delete post

router.delete('/delete/:postId', async(req, res) => {
    try{
        const removedpost = await Post.remove({_id: req.params.postId});
        res.json(removedpost);
    } catch (err) {
        res.json({message: err});
    }

});

//update post

router.patch('/patch/:postId', async(req, res) => {
    try{
        const updatepost = await Post.updateOne
        ({_id: req.params.postId}, {$set: {lastname: req.body.lastname}});
        res.json(updatepost);
    } catch (err) {
        res.json({message: err});
    }

});

module.exports = router;