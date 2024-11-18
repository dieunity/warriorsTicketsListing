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
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { formatDate, formatTime } from "../../utils/dayjs";

interface Data {
  owner: string;
  date: any;
  time: string | null;
  opponent: string;
  price: any;
  is_sold: boolean;
}

const TicketTable = () => {
  const [tickets, setTickets] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]); // Track selected ticket indices

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("date, time, opponent, price, is_sold, owner")
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

  const handleSelectTicket = (index: number) => {
    setSelectedTickets(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Remove if already selected
          : [...prev, index] // Add if not selected
    );
  };

  const generateEmailBody = () => {
    const selected = selectedTickets.map((index) => tickets[index]);
    const emailBody = selected
      .map(
        (ticket) =>
          `Opponent: ${ticket.opponent}\nDate: ${formatDate(
            ticket.date
          )}\nPrice: $${ticket.price}`
      )
      .join("\n\n");
    return encodeURIComponent(emailBody);
  };

  const emailLink = `mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request&body=${generateEmailBody()}`;

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
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Opponent</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        ticket.is_sold || ticket.owner === "KA"
                          ? "grey.200"
                          : "white",
                      opacity:
                        ticket.is_sold || ticket.owner === "KA" ? 0.7 : 1,
                      "&:hover": {
                        backgroundColor: "lightgray", // Add hover effect
                      },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!(ticket.is_sold || ticket.owner === "KA")) {
                        handleSelectTicket(index); // Toggle selection only for available rows
                      }
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedTickets.includes(index)}
                        disabled={ticket.is_sold || ticket.owner === "KA"}
                      />
                    </TableCell>
                    <TableCell>{formatDate(ticket.date)}</TableCell>
                    <TableCell>
                      {ticket.time ? formatTime(ticket.time) : "TBD"}
                    </TableCell>
                    <TableCell>{ticket.opponent}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          ticket.is_sold || ticket.owner === "KA"
                            ? "red"
                            : "black",
                      }}
                    >
                      {ticket.is_sold || ticket.owner === "KA"
                        ? "Sold"
                        : `$${ticket.price} / tix`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            href={emailLink}
            disabled={selectedTickets.length === 0} // Disable button if no tickets are selected
            style={{ marginTop: "20px" }}
          >
            Request Selected Tickets
          </Button>
        </>
      )}
    </div>
  );
};

export default TicketTable;
