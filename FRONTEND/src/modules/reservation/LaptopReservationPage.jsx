import { useState, useMemo } from "react";
import ReservationTemplate from "./components/ReservationTemplate";
function LaptopReservationPage() {
// Estado de filtros
const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: "",
    duration: "",
    peopleCount: "",
    searchQuery: "",
    os: "",              
    brand: "" 
});

// Opciones para los selectores
const startTimeOptions = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM"
];

const durationOptions = [
  "1 hora",
  "2 horas"
];

const peopleOptions = [
    { value: "1", label: "1 persona" },
    { value: "2", label: "2 personas" },
    { value: "3", label: "3 personas" },
    { value: "4", label: "4 personas" },
    { value: "5", label: "5+ personas" }
];

const osOptions = [
{ value: "Windows", label: "Windows" },
{ value: "Linux", label: "Linux" },
{ value: "macOS", label: "macOS" }
];

const brandOptions = [
{ value: "HP", label: "HP" },
{ value: "Dell", label: "Dell" },
{ value: "MSI", label: "MSI" },
{ value: "Lenovo", label: "Lenovo" },
{ value: "Apple", label: "Apple" },
{ value: "ASUS", label: "ASUS" }
];

// Datos de ejemplo de laptops disponibles
    const allLaptops = [
    {
    id: 1,
    name: "PC 03",
    availableSeats: 1,
    os: "Windows",      
    brand: "HP"
    },
    {
    id: 2,
    name: "PC 04",
    availableSeats: 1,
    os: "Linux",         
    brand: "MSI" 
    },
    {
    id: 3,
    name: "PC 05",
    availableSeats: 1,
    os: "Windows",       
    brand: "Dell"
    },
    {
    id: 4,
    name: "PC 06",
    availableSeats: 2,
    os: "macOS",          
    brand: "Apple" 
    },
    {
    id: 5,
    name: "PC 07",
    availableSeats: 2,
    os: "Linux",         
    brand: "Dell" 
    },
    {
    id: 6,
    name: "PC 08",
    availableSeats: 1,
    os: "Windows",         
    brand: "MSI" 
    },
    {
    id: 7,
    name: "PC 09",
    availableSeats: 3,
    os: "Linux",         
    brand: "MSI" 
    },
    {
    id: 8,
    name: "PC 10",
    availableSeats: 1,
    os: "Linux",         
    brand: "MSI" 
    }
];


    // Laptops filtradas
const filteredLaptops = useMemo(() => {
    let result = allLaptops.map(laptop => ({
    ...laptop,
    timeSlots: startTimeOptions, 
    durations: durationOptions,   
    }));

    // filtro por numero de personas
    if (filters.peopleCount) {
    const count = parseInt(filters.peopleCount);
    result = result.filter(laptop => laptop.availableSeats >= count);
    }

    //filtro segun so
    if (filters.os) {
        result = result.filter(laptop => laptop.os === filters.os);
    }

    //filtro segun marca
    if (filters.brand) {
        result = result.filter(laptop => laptop.brand === filters.brand);
    }

    // filtro de la barra de busqueda
    if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(laptop => 
        laptop.name.toLowerCase().includes(query)
    );
    }



    return result;
}, [filters.peopleCount,filters.os, filters.brand, filters.searchQuery]);




// Handler para cambios en filtros
const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filtros actualizados:", newFilters);
};

// Handler para realizar reserva
const handleReserve = (reservationData) => {
    console.log("Reserva realizada:", reservationData);
    alert(`Reserva confirmada:\nComputadora: ${reservationData.laptop}\nHora: ${reservationData.time}\nDuración: ${reservationData.duration}`);
};

// Handler para busqueda

const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
};

return (
    <ReservationTemplate
    filters={filters}
    onFiltersChange={handleFiltersChange}
    //cambio antes Laptops
    laptops={filteredLaptops}
    onReserve={handleReserve}
    onSearch={handleSearch}
    startTimeOptions={startTimeOptions}
    durationOptions={durationOptions}
    peopleOptions={peopleOptions}
    osOptions={osOptions}           
    brandOptions={brandOptions}
    selectedStartTime={filters.startTime}
    selectedDuration={filters.duration}
    />
);
}

export default LaptopReservationPage;