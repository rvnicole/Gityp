import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { BackButton, DestructiveRoundButton, OutlineRoundButton } from "../ui/Buttons";
import { ReactNode } from "react";
import Link from "next/link";

type DocumentDetailProps = {
    documentID: string;
    children: ReactNode;
}

export default function DocumentDetail({documentID, children}: DocumentDetailProps) {
    return (
        <div>
            <div className="md:flex justify-between p-3">
                <div>
                    <BackButton>
                        <ArrowUturnLeftIcon className="size-5 m-auto"/>
                    </BackButton>
                </div>

                <div className="grid grid-cols-2 gap-3 text-end">
                    <Link
                        href={`${documentID}?modal=edit`}
                    >
                        <OutlineRoundButton>Editar</OutlineRoundButton>
                    </Link>

                    <Link
                        href={""}
                    >
                        <DestructiveRoundButton>Eliminar</DestructiveRoundButton>
                    </Link>
                </div>
            </div>

            <div className="bg-backgroundColor border border-borderColor rounded-xl p-5">
                { children }
            </div>
        </div>
    )
}