import { useRef, useEffect } from "react";
// import type { Recipe } from "@/types/recipe.types";

import './Modale.scss';


interface ModaleProps {
    type: "alert" | "confirm";
    title: string;
    description?: string;
    modalIsOpen: boolean;
    setModalIsOpen: (arg: boolean) => void;
    onConfirm?: () => void;
}

const Modale = ({ type, title, description, modalIsOpen, setModalIsOpen, onConfirm }: ModaleProps) => {

    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {

        if (modalIsOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [modalIsOpen]);



    return (
        <>
            <dialog id="deleteDialog" className={`modale modale-${type}`} ref={dialog} onClose={() => setModalIsOpen(false)} >
                <form method="dialog">
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                    <menu className="list-actions">

                        {type === 'confirm' && (<>
                            <button id="confirmDelete" value="confirm" className="btn btn-cta" onClick={(e) => {
                                e.preventDefault();
                                onConfirm?.();
                            }}>
                                Supprimer
                            </button>
                            <button className="btn btn-link" value="cancel" >
                                Annuler
                            </button>

                        </>)}

                        {type === 'alert' && (<button value="confirm" className="btn btn-cta" >
                            OK
                        </button>)}

                    </menu>
                </form>
            </dialog>
        </>
    )
}
export default Modale;