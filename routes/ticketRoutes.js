// routes/ticketRoutes.js
const express = require("express");
const { createTicket, getAvailableTickets, getTicketById, getTicketByUserId } = require("../controllers/TicketController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createTicket);
router.get("/user", authenticate,getTicketByUserId);
router.get("/", getAvailableTickets);
router.get("/:id", getTicketById);

module.exports = router;
