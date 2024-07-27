import { createSignal } from 'solid-js';
import styles from '../App.module.css';

function AddBranchForm() {
  const [ branches, setBranches ] = createSignal([{}]);

  return (
    <>
      <form class={ styles.infoForm }>
        <div>
          <div class={ styles.infoFormDescription }>
            <p>Captura los datos de tu empresa</p>
            <p>Estos datos se utilizarán para los tickets y formatos imprimibles</p>
          </div>

          <p>Paso 2: Sucursales</p>

          <div class={ styles.branchFormCard }>
            <div>
              <div>
                <div class={ styles.branchFormLabels }>
                  <p>Nombre sucursal</p>
                  <p>Calle</p>
                  <p>Número exterior</p>
                  <p>Número interior</p>
                  <p>Código postal</p>
                </div>
                <div class={ styles.branchFormInputs }>
                  { branches().map(() => (
                    <div>
                      <input type='text' placeholder='Cañitas' />
                      <input type='text' placeholder='Norte 88' />
                      <input type='number' placeholder='902' />
                      <input type='number' placeholder='120' />
                      <input type='number' placeholder='02919' />
                    </div>
                  )) }
                </div>
              </div>
              <button class={ styles.secondaryButton } type='button' onClick={() => setBranches([...branches(), { ps: 1 }]) }>Agregar Sucursal</button>
            </div>

            <div class={ styles.branchFormButtons }>
              <button class={ styles.mainButton }>
                Anterior
              </button>
              <button class={ styles.mainButton }>
                Omitir
              </button>
              <button class={ styles.mainButton }>
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddBranchForm;