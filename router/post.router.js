import express from "express";
import fs from "fs";

const postRouter = express.Router();

postRouter.get("/:id/posts",(req,res)=>{
  const {id} = req.params
  try {
    let dataPosts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    if(dataPosts){
      let post = dataPosts.filter(post=>post.userId===+id)
      return res.status(200).json(post)
    }else{
      return  res.status(400).json("post not fount")
    }
  } catch (error) {
    return  res.status(400).json(error)
  }
})




export default postRouter