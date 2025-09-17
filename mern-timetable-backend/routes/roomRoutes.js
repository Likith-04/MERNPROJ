import express from "express";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

// GET all rooms
router.get("/", getRooms);

// POST new room
router.post("/", createRoom);

// PUT update room
router.put("/:id", updateRoom);

// DELETE room
router.delete("/:id", deleteRoom);

export default router;
