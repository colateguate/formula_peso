import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import tablaPesoIdeal from '../utils/tabla_peso_ideal_mujeres.json';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 1)'
};

const AddEntryModal = ({ open, onClose, onAddEntry }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [fatIndex, setFatIndex] = useState('');
    const [errors, setErrors] = useState({});
    const [sex, setSex] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name.trim() === "";
        tempErrors.weight = isNaN(parseFloat(weight)) || parseFloat(weight) <= 0;
        tempErrors.fatIndex = isNaN(parseFloat(fatIndex)) || parseFloat(fatIndex) <= 0;
        tempErrors.sex = sex.trim() === "";
        tempErrors.height = isNaN(parseInt(height)) || parseInt(height) < 150 || parseInt(height) > 200; // Asumiendo que la altura es en cm.
        tempErrors.age = isNaN(parseInt(age)) || parseInt(age) < 21 || parseInt(age) > 71;
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === false);
    };

    const handleSubmit = () => {
        if (validate()) {
            // Masa Grasa (Kg):
            const massFat = parseFloat((weight * (fatIndex / 100)).toFixed(2));

            // Peso ideal (tomando en cuenta el sexo y la edad, ajustando según la tabla)
            const pesoPorAltura = tablaPesoIdeal.pesoPorAltura[height.toString()];
            const ajustePorEdad = tablaPesoIdeal.ajustePorEdad[age.toString()];
            const pesoIdealCalculado = pesoPorAltura + ajustePorEdad;

            // Kilos de Masa Grasa Óptimos:
            // Aquí debes incluir tu lógica para calcular los kilos de masa grasa óptimos.
            // Por ejemplo, podrías tener una tabla o una fórmula basada en el sexo y la edad.
            const optimalFatKilos = 0.0/* Tu lógica aquí basada en la tabla de peso ideal */;

            // Exceso de Masa Grasa (Kg):
            const excessFat = massFat > optimalFatKilos ? parseFloat((massFat - optimalFatKilos).toFixed(2)) : 0;
            const leanMass = parseFloat((weight - massFat).toFixed(2));
            const water = parseFloat((0.732 * leanMass).toFixed(2));
            const actualWater = parseFloat((weight - leanMass).toFixed(2));
            const excessWater = actualWater > water ? parseFloat((actualWater - water).toFixed(2)) : 0;

            const entry = {
                name,
                sex,
                height,
                age,
                weight: parseFloat(weight),
                fatIndex: parseFloat(fatIndex),
                massFat,
                optimalFatKilos, // Asegúrate de calcular este valor correctamente
                excessFat,
                leanMass,
                water,
                excessWater,
                idealWeight: pesoIdealCalculado,
            };

            onAddEntry(entry);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <h3>Nuevo Registro</h3>
                <TextField
                    error={errors.name}
                    helperText={errors.name ? "Este campo es obligatorio." : ""}
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    error={errors.weight}
                    helperText={errors.weight ? "Este campo es obligatorio y numérico." : ""}
                    label="Peso"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    // ... otros props
                    label="Altura"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    // ... otros props
                    label="Edad"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <InputLabel id="select-sex-label">Sexo</InputLabel>
                <Select
                    labelId="select-sex-label"
                    id="select-sex"
                    value={sex}
                    label="Sexo"
                    onChange={(e) => setSex(e.target.value)}
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value={'Mujer'}>Mujer</MenuItem>
                    <MenuItem value={'Hombre'}>Hombre</MenuItem>
                </Select>
                <TextField
                    error={errors.fatIndex}
                    helperText={errors.fatIndex ? "Este campo es obligatorio y numérico." : ""}
                    label="Índice de grasa"
                    value={fatIndex}
                    onChange={(e) => setFatIndex(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 2, width: '100px' }}
                >
                    Añadir
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEntryModal;
