const Post = require('../models/postModel')


// @desc add a new post 
// @params : post /api/post/newpost
// @access : PRIVATE - USER

const addPost = async (req, res) => {
    try {
        const userId = req.personId
        const {title, description, image } = req.body
        const newPost = await Post.create({title, description, image , owner: userId })
        res.status(201).json({msg:"new post created!", post: newPost })
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}

// @desc get all posts 
// @params : GET /api/post/getposts
// @access : PUBLIC
const getPosts = async (req, res) => {
    try {
        
        const allPosts = await Post.find().populate('owner', '-password -__v').sort("-createdAt")
        res.status(200).json({msg:"successfully got all posts", post: allPosts })
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}


// @desc get posts of owner 
// @params : GET /api/post/getuserposts/:id
// @access : PUBLIC
const getUserPosts = async (req, res) => {
    try {
        const allUserPosts = await Post.find({owner: req.params.id}).sort("-createdAt")
        res.status(200).json({msg:"successfully got all the posts of the user", post: allUserPosts })
    } catch (error) {
        res.status(500).json({msg:"something went wrong!", error: error.message})
    }
}

module.exports = {addPost, getPosts, getUserPosts }