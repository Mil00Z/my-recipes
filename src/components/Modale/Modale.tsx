import { useRef, useEffect } from "react";
// import type { Recipe } from "@/types/recipe.types";

import './Modale.scss';


interface ModaleProps {
    title: string;
    modalIsOpen: boolean;
    setModalIsOpen: (arg: boolean) => void;
    // confirm?: () => void;
    // delete?: () => void;
}

const Modale = ({ title, modalIsOpen, setModalIsOpen }: ModaleProps) => {

    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {

        if (modalIsOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }

        console.log(dialog.current?.returnValue);
    }, [modalIsOpen]);



    return (
        <>
            <dialog id="deleteDialog" className="modale" ref={dialog} onClose={() => setModalIsOpen(false)} >
                <form method="dialog">
                    <h2>Confirmer la suppression ?</h2>
                    <p>{`Are you sure you want to delete - ${title ? title : 'Recette Unknown'} ?`}</p>
                    <menu className="list-actions">
                        <button id="confirmDelete" value="confirm" className="btn btn-cta">
                            Supprimer
                        </button>
                        <button className="btn btn-cta" value="cancel" >
                            Annuler
                        </button>
                    </menu>
                </form>
            </dialog>
        </>
    )
}
export default Modale;