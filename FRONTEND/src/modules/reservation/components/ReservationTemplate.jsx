    import Navbar from "../../../globals/components/organism/Navbar";
    import Footer from "../../../globals/components/organism/Footer";
    import ReservationFilters from "../../../globals/components/organism/ReservationFilters";
    import LaptopList from "../../../globals/components/organism/LaptopList";

    function ReservationTemplate({
    filters,
    onFiltersChange,
    laptops,
    onReserve,
    onSearch,
    startTimeOptions,
    durationOptions,
    peopleOptions,
    osOptions,          
    brandOptions, 
    selectedStartTime,
    selectedDuration
    }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 space-y-8 bg-red-50">
            

            {/* Filtros */}
            <ReservationFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            startTimeOptions={startTimeOptions}
            durationOptions={durationOptions}
            peopleOptions={peopleOptions}
            osOptions={osOptions}           
            brandOptions={brandOptions} 
            />

            {/* Lista de laptops */}
            <LaptopList
            laptops={laptops}
            onReserve={onReserve}
            onSearch={onSearch}
            selectedStartTime={selectedStartTime}
            selectedDuration={selectedDuration}
            />
        </main>
        </div>
    );
    }

    export default ReservationTemplate;