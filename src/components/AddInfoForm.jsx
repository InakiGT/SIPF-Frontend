import styles from '../App.module.css';

function AddInfoForm() {
  return (
    <>
      <form class={ styles.infoForm }>
        <div>
          <div class={ styles.infoFormDescription }>
            <p>Captura los datos de tu empresa</p>
            <p>Estos datos se utilizarán para los tickets y formatos imprimibles</p>
          </div>

          <p>Paso 1: Datos adicionales</p>

          <div class={ styles.infoFormInputs }>
            <div>
              <label>Calle</label>
                <input 
                  type='text' 
                  placeholder="Norte 88"
                  class={ styles.mainInput }
                />
            </div>
            <div>
              <label>Número exterior</label>
              <input 
                type='number' 
                placeholder="6607" 
                class={ styles.mainInput }
                />
            </div>
            <div>
              <label>Número interior</label>
              <input 
                type='number' 
                placeholder="708" 
                class={ styles.mainInput }
                />
            </div>
            <div>
              <label>Teléfono</label>
              <input 
                type='number' 
                placeholder="5511223344" 
                class={ styles.mainInput }
                />
            </div>
            <div>
              <label>Email</label>
              <input 
                type='email' 
                placeholder="correo@gmail.com" 
                class={ styles.mainInput }
              />
            </div>
            <div>
              <button class={ styles.mainButton }>
                Anterior
              </button>
              <button class={ styles.mainButton }>
                Omitir
              </button>
              <button class={ styles.mainButton }>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddInfoForm;