import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";

import styles from '../App.module.css';

function CreateItemDialog({ route, response, setResponse, type }) {
    const navigate = useNavigate();
    let dialog;

    const [ dialogcontent, setDialogcontent ] = createSignal({
        content: '',
        img: '',
        status: 0,
    });

    createEffect(() => {
        if (response()) {
            setDialogcontent({
                content: `${ type } creado correctamente`,
                img: 'https://static-00.iconduck.com/assets.00/ok-icon-512x512-lqzmv8k6.png',
                status: 1,
            });
        } else {
            setDialogcontent({
                content: `Hubo un error al intentar crear ${ type }, revisa que hayas llenado todos los campos`,
                img: 'https://static-00.iconduck.com/assets.00/process-error-icon-512x512-zmcympnc.png',
                status: 0,
            });
        }
        
        if (response() !== null) {
            dialog.showModal();
        }
    });

    const closeModal = () => {
        dialog.close();
        setResponse(null);
    }
    
    return (
        <dialog class={ styles.mainDialog } ref={el => dialog = el}>
            <img src={ dialogcontent().img } />
            <p>{ dialogcontent().content }</p>
            <div>
                { dialogcontent().status ? (
                    <button class={ styles.mainButton } onClick={ () => navigate(`/${ route }`) }>Entendido</button>
                ) : (
                    <button class={ styles.mainButton } onClick={ () =>  closeModal()}>Regresar</button>
                ) }
            </div>
        </dialog>
    );
}

export default CreateItemDialog;