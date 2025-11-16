    import FilterGroup from "../molecules/FilterGroup";

    function ReservationFilters({
    filters,
    onFiltersChange,
    startTimeOptions,
    durationOptions,
    peopleOptions,
    osOptions,          
    brandOptions
    }) {

        
    const handleDateChange = (newDate) => {   
    onFiltersChange({ ...filters, date: newDate });  
    };

    const handleStartTimeChange = (e) => {
        onFiltersChange({ ...filters, startTime: e.target.value });
    };

    const handleDurationChange = (e) => {
        onFiltersChange({ ...filters, duration: e.target.value });
    };

    const handlePeopleCountChange = (e) => {
        onFiltersChange({ ...filters, peopleCount: e.target.value });
    };

    
    const handleOsChange = (e) => {
        onFiltersChange({ ...filters, os: e.target.value });
    };


    const handleBrandChange = (e) => {
        onFiltersChange({ ...filters, brand: e.target.value });
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
        <FilterGroup
            date={filters.date}
            onDateChange={handleDateChange}
            startTime={filters.startTime}
            onStartTimeChange={handleStartTimeChange}
            duration={filters.duration}
            onDurationChange={handleDurationChange}
            peopleCount={filters.peopleCount}
            onPeopleCountChange={handlePeopleCountChange}
            os={filters.os}                      
            onOsChange={handleOsChange}         
            brand={filters.brand}                
            onBrandChange={handleBrandChange}
            startTimeOptions={startTimeOptions}
            durationOptions={durationOptions}
            peopleOptions={peopleOptions}
            osOptions={osOptions}                
            brandOptions={brandOptions} 
        />
        </div>
    );
    }

    export default ReservationFilters;