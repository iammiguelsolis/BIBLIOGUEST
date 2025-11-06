    import Input from "../atoms/Input";
    import Button from "../atoms/Button";

    function SearchBar({
    placeholder = "Buscar un libro, autor o tema...",
    buttonLabel = "Buscar",
    onSearch, 
    }) {
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (onSearch) onSearch(); 
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
        <Input
            placeholder={placeholder}
            onChange={(e) => console.log("Texto:", e.target.value)}
        />
        <Button variant="primary" onClick={handleSubmit}>
            {buttonLabel}
        </Button>
        </form>
    );
    }

    export default SearchBar;
