import express from "express";
import { body } from "express-validator";
import fs from "fs";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  try {
    let dataUser = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    res.status(200).json(dataUser);
  } catch (error) {
    return res.status(400).json(error)
  }
});


userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let dataUser = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    let user = dataUser.filter((user) => user.id === +id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json("user not found");
    }
  } catch (error) {
    return res.status(400).json(error)
  }
});


userRouter.post(
  "/",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 4 })
    .withMessage("username minimum 4 characters"),
  body("name")
    .exists()
    .withMessage("name is required")
    .isLength({ min: 4 })
    .withMessage("name minimum 4 characters"),
  (req, res) => {
    const  user  = req.body;
    try {
      let dataUser = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      user.id= Math.floor(Math.random() * 1000000000)
      dataUser.push(user)
      fs.writeFileSync("./user-post-api/users.json",JSON.stringify(dataUser))
      return res.status(200).json('create succsess')
    } catch (error) {
      return res.status(400).json(error)
    }
  }
);


userRouter.put(
  "/",
  body("id")
    .notEmpty()
    .withMessage("id is required"),
  (req, res) => {
    const  newUser  = req.body;
    try {
      let dataUser = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      const index = dataUser.findIndex(user=>user.id==newUser.id) 
      if(index<0){
        return res.status(400).json("user not found")
      }
      dataUser[index]={...dataUser[index],...newUser
      }
      console.log(dataUser)
      fs.writeFileSync("./user-post-api/users.json",JSON.stringify(dataUser))
      return res.status(200).json('update succsess')
    } catch (error) {
      return res.status(400).json(error)
    }
  }
);


userRouter.delete(
  "/",
  body("id")
    .exists()
    .withMessage("id is required"),
  (req, res) => {
    const  {id}  = req.body;
    try {
      let dataUser = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      const index = dataUser.findIndex(user=>user.id==id) 
      console.log(typeof(index))
      if(index<0){
        return res.status(400).json("user not found")
      }
      dataUser.splice(index,1)
      fs.writeFileSync("./user-post-api/users.json",JSON.stringify(dataUser))
      return res.status(200).json('delete succsess')
    } catch (error) {
      return res.status(400).json(error)
    }
  }
);






export default userRouter;
