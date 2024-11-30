import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { formatDate, formatTime } from "../../utils/dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  Button,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";

interface Data {
  date: string;
  time: string | null;
  opponent: string;
  price: number;
  promotional_night: boolean;
  promotional_night_details: string;
  for_sale: boolean;
}

const TicketTable = () => {
  const [tickets, setTickets] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoTooltipOpen, setPromoTooltipOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]); // Track selected ticket indices
  const [showAvailableOnly, setShowAvailableOnly] = useState(true); // State for filtering

  const fetchTickets = async () => {
    // @ts-ignore: Ignoring type errors temporarily
    const { data, error } = await supabase
      .from("tickets")
      .select(
        "date, time, opponent, price, promotional_night, promotional_night_details, for_sale"
      )
      .order("date", { ascending: true });
    if (error) {
      console.error("Error fetching tickets:", error);
    } else {
      setTickets((data as any as Data[]) ?? []);
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

  const filteredTickets = showAvailableOnly
    ? tickets.filter((ticket) => ticket.for_sale)
    : tickets;

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
            {/* Toolbar */}
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Filter Tickets</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAvailableOnly((prev) => !prev)}
              >
                {showAvailableOnly
                  ? "Show All Tickets"
                  : "Show Available Tickets"}
              </Button>
            </Toolbar>

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
                {filteredTickets.map((ticket, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: ticket.for_sale ? "white" : "grey.200",
                      opacity: ticket.for_sale ? 1 : 0.7,
                      "&:hover": {
                        backgroundColor: "lightgray", // Add hover effect
                      },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (ticket.for_sale) {
                        handleSelectTicket(index); // Toggle selection only for available rows
                      }
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedTickets.includes(index)}
                        disabled={!ticket.for_sale}
                      />
                    </TableCell>
                    <TableCell>{formatDate(ticket.date)}</TableCell>
                    <TableCell>
                      {ticket.time ? formatTime(ticket.time) : "TBD"}
                    </TableCell>
                    <TableCell>{ticket.opponent}</TableCell>
                    <TableCell
                      sx={{
                        color: ticket.for_sale ? "black" : "red",
                      }}
                    >
                      {ticket.for_sale ? `$${ticket.price} / tix` : "Sold"}
                      {ticket.promotional_night && (
                        <Tooltip
                          title={ticket.promotional_night_details}
                          enterDelay={0}
                          open={promoTooltipOpen}
                          onOpen={() => setPromoTooltipOpen(true)}
                          onClose={() => setPromoTooltipOpen(false)}
                        >
                          <IconButton
                            aria-label="trash"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPromoTooltipOpen(true);
                            }}
                          >
                            🎁
                          </IconButton>
                        </Tooltip>
                      )}
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
