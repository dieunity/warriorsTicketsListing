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
import { formatDate, formatTime } from "../../utils/dayjs";

interface Data {
  date: any;
  time: string | null;
  opponent: string;
  price: any;
  is_sold: boolean;
}

const TicketTable = () => {
  const [tickets, setTickets] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("date, time, opponent, price, is_sold")
      .order("date", { ascending: true });
    if (error) {
      console.error("Error fetching tickets:", error);
    } else {
      setTickets(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Tickets Prices
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Price is per ticket. I have 3 tickets available at section 109, row 10
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
              {tickets.map((ticket, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: ticket.is_sold ? "grey.200" : "white",
                      opacity: ticket.is_sold ? 0.6 : 1,
                    }}
                  >
                    <TableCell>{formatDate(ticket.date)}</TableCell>
                    <TableCell>
                      {ticket.time ? formatTime(ticket.time) : "TBD"}
                    </TableCell>
                    <TableCell>{ticket.opponent}</TableCell>
                    <TableCell>${ticket.price}</TableCell>
                    <TableCell>
                      {ticket.is_sold ? "Sold" : "Available"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TicketTable;
