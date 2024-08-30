"use client"
import { Dialog, Transition } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode } from "react";
import { SecondaryButton } from "./Buttons";

export default function Modal({children}: {children: ReactNode}) {
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="flex flex-col">
                        <p className="text-xl font-semibold text-foregroundColor text-center p-3">{ children }</p>
                        <SecondaryButton  onClick={() => router.replace(`${location.pathname}`)}>Aceptar</SecondaryButton>
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