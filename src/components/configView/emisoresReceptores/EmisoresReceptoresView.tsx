"use client"
import { EmisoresReceptores } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import CardEntity from "../../cards/CardEntity";

type EmisoresReceptoresViewProps = {
    emisores?: EmisoresReceptores[]
    receptores?: EmisoresReceptores[]
}

export default function EmisoresReceptoresView({ emisores, receptores }: EmisoresReceptoresViewProps){
    
    if(emisores) return(
        <div className="space-y-5">          
            {
                emisores.map( emisor =>
                    <CardEntity key={emisor.id} emisor={emisor}/>
                )
            }
        </div> 
    )

    if(receptores) return(
        <div className="space-y-5">          
            {
                receptores.map( receptor =>
                    <CardEntity key={receptor.id} receptor={receptor}/>
                )
            }
        </div> 
    )
};