    import Input from "../../../globals/components/atoms/Input";
    import Button from "../../../globals/components/atoms/Button";

    function LoginForm() {
    return (
        <div className="bg-surface/20 p-8 rounded-xl shadow-lg max-w-sm w-full space-y-6">
        <h2 className="text-2xl font-bold text-neutral text-center">
            Iniciar Sesión
        </h2>

        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/960px-UNMSM_coatofarms_seal.svg.png" alt="Biblioguest" /> 
        </div>

        <Input label="Correo" placeholder="usuario@unmsm.pe" />
        <Input label="Contraseña" type="password" placeholder="********" />

        <div className="flex justify-center ">
        <Button variant="primary">Ingresar</Button>
        </div>

        </div>
    );
    }

    export default LoginForm;
