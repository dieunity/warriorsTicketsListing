import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { mockDataSingleAd } from "../mockData/mockData";
import { useEffect, useState } from "react";

export const SingleAd = () => {
  const [data, setData] = useState<any[]>([[], []]);
  const [url, setUrl] = useState(
    "https://script.google.com/macros/s/AKfycbyK8Qhi3yWYVecknV_2SDexsyFfsZ8q8_P4tyhsZ9oGuCKJ0kWt1E31i2xnGR6isdOXUg/exec"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetch(url).then((res) =>
          res.json().then((data) => {
            console.log(data, "hello");
            return data.content;
          })
        );

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const headers = data[0].slice();
  const rows = data.slice(1);

  return (
    <>
      {isError && <div>data fetch failed</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((header: string, idx: number) => (
                  <TableCell key={idx}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.map((cell: string, idx: number) => (
                    <TableCell align="right" key={idx}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
