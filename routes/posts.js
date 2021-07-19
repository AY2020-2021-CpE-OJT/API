const express = require ('express');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const Post = require ('../Models/post');

//log in
router.post('/login', (req, res) => {

    const user = {
  
      id: 1820342,
      username: 'jraph',
      email:'john@gmail.com'
    }
  
    jwt.sign({user}, 'secret', (err, token) => {
      res.json({
        token
      });
    });
  });
  

//Verify
function verifyToken(req, res, next){
    //get auth header
    const headerBearer = req.headers['authorization'];
    //if tokean bearer is undefined 
    if (typeof headerBearer !== 'undefined'){
        //split at space
        const bearer = headerBearer.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        //next middleware
        next();
  
    } else{
      //request denied
      res.sendStatus(403);
    }
  }

//gets back all the posts

router.get('/', verifyToken, async (req, res) => {
    const posts = await Post.find();

    jwt.verify(req.token, 'secret', (err, authdata) => {
        if(err){
            res.sendStatus(403);
        }else{

            try{
                res.json(posts);
            } catch (err) {
                res.json({message: err});
            }
        }
    });
});


//submits post
router.post('/create',  verifyToken, async (req, res) => {
    
    const post = new Post({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        phonenumbers: req.body.phonenumbers
    });

    const savedPost = await post.save();
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if(err){
            res.sendStatus(403);
        }else{

            try{
    
                res.json(savedPost);

             }catch(err){
                res.json({message: err});
        }
    }
    });
});


//specific post

router.get('/get/:postId', verifyToken, async(req, res) => {
    const post = await Post.findById(req.params.postId);

    jwt.verify(req.token, 'secret', (err, authdata) => {
        
        if(err){
            res.sendStatus(403);
        }else{
            try{
                res.json(post);
            } catch (err) {
                res.json({message: err});
            }
        }
    });
});

//Delete post

router.delete('/delete/:postId', async(req, res) => {

    const removedpost = await Post.remove({_id: req.params.postId});

    jwt.verify(req.token, 'secret', (err, authdata) => {

        if(err){
            res.sendStatus(403);

        }else{

            try{
                res.json(removedpost);
            } catch (err) {
                res.json({message: err});
            }

        }
    });
});


//update post

router.patch('/patch/:postId', async(req, res) => {
    const updatepost = await Post.updateOne
    ({_id: req.params.postId}, {$set: {lastname: req.body.lastname}});
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if(err){
            res.sendStatus(403);
        }else{

            try{
                
                res.json(updatepost);
            } catch (err) {
                res.json({message: err});
            }
        }
    });
});



module.exports = router;
