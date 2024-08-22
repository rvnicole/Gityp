import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { DestructiveRoundButton, OutlineRoundButton, SecondaryRoundButton } from "../ui/Buttons";
import Link from "next/link";

export default function DocumentDetail() {
    return (
        <div className="p-3">
            <div className="flex justify-between p-3">
                <div className="text-white bg-inputColor p-1 rounded-full hover:bg-primaryColor">
                    <Link
                        href="/presupuestos"
                    >
                        <ArrowUturnLeftIcon className="size-5"/>
                    </Link>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <OutlineRoundButton>
                        Editar
                    </OutlineRoundButton>

                    <SecondaryRoundButton>
                        Imprimir
                    </SecondaryRoundButton>

                    <DestructiveRoundButton>
                        Eliminar
                    </DestructiveRoundButton>
                </div>
            </div>

            <div className="bg-backgroundColor border border-borderColor rounded-xl p-5">
                <p className="text-2xl font-bold mb-5">Documento #ID</p>
                <p>Persona quien solicitó: <span>{'Solicito'}</span></p>
            </div>
        </div>
    )
}