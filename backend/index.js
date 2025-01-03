import express from "express";
import ImageKit from "imagekit";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { requireAuth } from '@clerk/express'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));

app.use(express.json())

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
};

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});
  
app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.post("/api/chats", requireAuth(), async (req, res) => {
    const userId = req.auth.userId
    const {text} = req.body;

    try {
        // CREATE A NEW CHAT
        const newChat = new Chat({
            userId:userId,
            history:[{role:"user",parts: [{text}]}],
        })
        const savedChat = await newChat.save();

        // CHECK IF THE USERCHATS EXISTS
        const userChats = await UserChats.findOne({userId:userId});

        // IF DOESNT EXIST CREATE A NWE ONE AND ADD THE CHAT IN THE CHATS ARRAY
        if(!userChats) {
            const newUserChats = new UserChats({
                userId:userId,
                chats:[
                    {
                        _id:savedChat._id,
                        title:text.substring(0,40),
                    }
                ],
            })

            await newUserChats.save();
        } else {
            //IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
            await UserChats.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title:text.substring(0,40),
                    },
                },
            });

            res.status(201).send(newChat._id);
        }

    } catch(err){
        console.log(err);
        res.status(500).send("Error creating chat!");
    }
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;

    try{
      const userChats = await UserChats.find({ userId });
      if (userChats.length > 0) {
        res.status(200).send(userChats[0].chats);
      } else {
        res.status(200).send([]); // Return an empty array if no user chats are found
      }
    } catch(err) {
        console.log(err);
        res.status(500).send("Error fetching userchats!");
    }
});

app.get("/api/chats/:id", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    try {
      const chat = await Chat.findOne({ _id: req.params.id, userId });
  
      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching chat!");
    }
});

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    const { question, answer, img, isVoiceInput } = req.body;
  
    const newItems = [
      ...(question
        ? [{
            role: "user",
            parts: [{ text: question }],
            ...(img && { img }),
            ...(isVoiceInput && { isVoiceInput })
          }]
        : []),
      { role: "model", parts: [{ text: answer }] },
    ];
  
    try {
      const updatedChat = await Chat.updateOne(
        { _id: req.params.id, userId },
        {
          $push: {
            history: {
              $each: newItems,
            },
          },
        }
      );
      res.status(200).send(updatedChat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding conversation!");
    }
});

app.listen(port, () => {
    connect()
    console.log("Server is running on port 3000")
});