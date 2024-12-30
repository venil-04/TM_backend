// routes/ticketRoutes.js
const express = require("express");
const { createTicket, getAvailableTickets, getTicketById } = require("../controllers/TicketController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createTicket);
router.get("/", getAvailableTickets);
router.get("/:id", getTicketById);

module.exports = router;
