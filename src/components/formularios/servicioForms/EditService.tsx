import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData } from "@/src/types";

export default function EditService(){
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>();

    const handleCloseForm = () => {

    };

    const handleServiceFormData = () => {

    };

    return(
        <form action="">
            <ServicioForm 
                register={register}
                errors={errors}
                handleCloseForm={handleCloseForm}
                handleServiceFormData={handleServiceFormData}
                handleSubmit={handleSubmit}
            />
        </form>
    )
}