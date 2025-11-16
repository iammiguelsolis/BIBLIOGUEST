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
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <header className="w-full  py-3 px-6 shadow-lg ">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
            Computadoras
            </h1>
            <p className="text-black text-lg">Biblioguest</p>
        </div>
        </header>

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

        {/* Footer */}
        <Footer />
        </div>
    );
    }

    export default ReservationTemplate;