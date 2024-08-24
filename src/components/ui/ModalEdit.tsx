"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Factura, GestionCobros, OrdenServicio, Presupuesto, Servicio } from '@/src/types';
import GestionCobroForm from '../formularios/gestionCobroForms/GestionCobroForm';
import OrdenServicioForm from '../formularios/ordenServicioForms/OrdenServicioForm';
import FacturaForm from '../formularios/facturaForms/FacturaForm';
import ServicioForm from '../formularios/servicioForms/ServicioForm';
import EditPresupuesto from '../formularios/presupuestoForms/EditPresupuesto';
import EditService from '../formularios/servicioForms/EditService';

type ModalProps = {
  documentType: 'presupuesto' | 'factura' |  'ordenServicio' | 'gestionCobro' | 'servicio',
  defaultValues?: Presupuesto | OrdenServicio | Servicio | Factura | GestionCobros
};

const formsEdit = {
  'presupuesto': { 
    "tsx": <EditPresupuesto />, 
    "title": 'Presupuesto' 
  },
  'factura': { 
    "tsx": <FacturaForm />, 
    "title": 'Factura' 
  },
  'ordenServicio': { 
    "tsx": <OrdenServicioForm />, 
    "title": 'Orden de servicio' 
  },
  'gestionCobro': { 
    "tsx": <GestionCobroForm />, 
    "title": "Seguimiento de Gestión de cobro" 
  },
  'servicio': {
    "tsx": <EditService />, 
    "title": 'Servicio'
  }
}

const selectForm = ( documentType: ModalProps['documentType'] ) => formsEdit[documentType].tsx;

export default function ModalEdit({documentType}: ModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modo = searchParams.get('modal');
  const isOpen = !!modo;


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => router.replace(`${location.pathname}`)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h2 className='font-bold text-2xl'>Editar { formsEdit[documentType].title }</h2>
                      <h3 className='text-cardColor-foreground'>Ingrese la siguiente información:</h3>
                      { 
                        selectForm(documentType)
                      }
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}