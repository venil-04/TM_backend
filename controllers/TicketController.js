// controllers/ticketController.js
const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { trainNumber, trainName, departureDate, departureTime, from, to, seatNumber, price } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized! Please log in first." });
    }

    const ticket = new Ticket({
      userId: req.user._id,
      trainNumber,
      trainName,
      departureDate,
      departureTime,
      from,
      to,
      seatNumber,
      price,
    });

    await ticket.save();

    res.status(201).json({ message: "Ticket listed successfully!", ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: "available" }).populate("userId", "email name");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicketById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const ticket = await Ticket.findById(id).populate("userId", "name email");
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
  
      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
