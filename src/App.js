import React, { useState, useEffect } from 'react';
import EntriesTable from './components/EntriesTable';
import AddEntryModal from './components/AddEntryModal';
import { Button, Box } from '@mui/material';

function App() {
  const [entries, setEntries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries'));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  const handleNewEntry = (entry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    localStorage.setItem('entries', JSON.stringify(newEntries));
    setModalOpen(false);
  };

  // Función para convertir datos a CSV
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
    }, str);
  };

  // Función para descargar los datos como CSV
  const downloadCSV = () => {
    const csvStr = convertToCSV(entries);
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvStr);
    const exportFileDefaultName = 'entries.csv';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div>
      <EntriesTable entries={entries} />
      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Generar nueva entrada
        </Button>
        <Button variant="contained" onClick={downloadCSV}>
          Descargar como CSV
        </Button>
      </Box>
      <AddEntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEntry={handleNewEntry}
      />
    </div>
  );
}

export default App;
