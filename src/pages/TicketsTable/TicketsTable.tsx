import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets from the Supabase database
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("date, time, opponent, price, is_sold");
    if (error) {
      console.error("Error fetching tickets:", error);
    } else {
      setTickets(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Game Tickets
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Opponent</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>{ticket.time ? ticket.time : "TBD"}</TableCell>
                  <TableCell>{ticket.opponent}</TableCell>
                  <TableCell>${ticket.price}</TableCell>
                  <TableCell>{ticket.is_sold ? "Sold" : "Available"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TicketTable;