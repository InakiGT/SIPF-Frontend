import styles from '../App.module.css';

function AddInfo({ showForm, setShowForm }) {
  console.log(showForm());

  return(
    <>
      <div>
        <p>Bienvenido</p> 
        <p>Iniciar es muy sencillo</p>
      </div>

      <div class={ styles.mainContent }>
        <div>
          <p>Información de tu empresa</p>
          <img src='https://th.bing.com/th/id/OIG4.qmZWiGAM4RoVuuCKjPVa?w=1024&h=1024&rs=1&pid=ImgDetMain' />
          <p>Sube logotipo, nombre de tu empresa, tu domicilio y demás datos que se imprimirán en los tickets, facturas y documentos</p>
        </div>
        <button
          class={ styles.mainButton }
          onClick={() => setShowForm(!showForm())}
        >
          Datos de mi empresa
        </button>
      </div>
    </>
  );
}

export default AddInfo;