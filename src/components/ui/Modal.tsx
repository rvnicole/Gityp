"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Factura, GestionCobros, OrdenServicio, Presupuesto, Servicio } from '@/src/types';
import PresupuestoForm from '../formularios/PresupuestoForm';
import GestionCobroForm from '../formularios/GestionCobroForm';
import OrdenServicioForm from '../formularios/OrdenServicioForm';
import FacturaForm from '../formularios/FacturaForm';
import ServicioForm from '../formularios/ServicioForm';

type ModalProps = {
  documentType: 'presupuesto' | 'factura' |  'ordenServicio' | 'gestionCobro' | 'servicio',
  defaultValues?: Presupuesto | OrdenServicio | Servicio | Factura | GestionCobros
};

const forms = {
  'presupuesto': { 
    "tsx": <PresupuestoForm />, 
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
    "tsx": <ServicioForm />, 
    "title": 'Servicio'
  }
}

const selectForm = ( documentType: ModalProps['documentType'] ) => forms[documentType].tsx;

export default function Modal({documentType}: ModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modo = searchParams.get('modal');
  const isOpen = !!modo;

  function openModal(){
    router.push('?modal=create');
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => router.replace('/')}>
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
                      <h2 className='font-bold text-2xl'>Crear { forms[documentType].title }</h2>
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