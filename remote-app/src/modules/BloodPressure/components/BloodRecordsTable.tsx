import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { BloodPressureRecord } from "../../../api/bloodpressure/bloodpressure";

export interface BloodRecordsTableProps {
    records?: BloodPressureRecord[];
}

const BloodRecordsTable = ({ records }: BloodRecordsTableProps) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Systolic</TableCell>
                        <TableCell>Diastolic</TableCell>
                        <TableCell>Pulse</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records?.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>{new Date(record.measuredAt).toLocaleString()}</TableCell>
                            <TableCell>{record.systolic}</TableCell>
                            <TableCell>{record.diastolic}</TableCell>
                            <TableCell>{record.pulse}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BloodRecordsTable;