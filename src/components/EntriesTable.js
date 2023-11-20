import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import NoDataIcon from '@mui/icons-material/Block'; // Este es un ícono de ejemplo, elige el que prefieras


const EntriesTable = ({ entries }) => {
    return (
        <TableContainer component={Paper} className="TableContainer-root">
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {/* Reemplaza esto con los nombres de tus columnas */}
                        <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>SEXO</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>PESO</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>MASA GRASA</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>KILOS MASA GRASA ÓPTIMOS</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>EXCESO DE MASA GRASA</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>MATERIA NO GRASA</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>AGUA</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>EXCESO AGUA</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>PESO IDEAL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry.name}</TableCell>
                                {/* Asumiendo que tienes una propiedad "sexo" en tus entradas, si no, elimínala o ajusta según tus datos */}
                                <TableCell>{entry.sex || 'No especificado'}</TableCell>
                                <TableCell>{entry.weight}</TableCell>
                                <TableCell>{entry.massFat}</TableCell>
                                <TableCell>{entry.optimalFatKilos}</TableCell>
                                <TableCell>{entry.excessFat}</TableCell>
                                <TableCell>{entry.leanMass}</TableCell>
                                <TableCell>{entry.water}</TableCell>
                                <TableCell>{entry.excessWater}</TableCell>
                                {/* Asumiendo que has calculado el "peso ideal" en algún lugar y lo has agregado a tu objeto entry */}
                                <TableCell>{entry.idealWeight || 'Calculo pendiente'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10}>
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px" flexDirection="column">
                                    <NoDataIcon fontSize="large" />
                                    <Typography variant="subtitle1">No hay datos para mostrar</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EntriesTable;
