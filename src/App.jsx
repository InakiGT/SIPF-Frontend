import { Show, createEffect, createSignal } from 'solid-js';

import styles from './App.module.css';
import AddInfo from './components/AddInfo';
import AddInfoForm from './components/AddInfoForm';
import AddBranchForm from './components/AddBranchForm';
import checkLogin from './helpers/checkLogin';

function App() {

  const [ showForm, setShowForm ] = createSignal(true);

  createEffect(() => {
    checkLogin();
  });

  return (
    <div class={ styles.mainContainer }>
      <Show when={ showForm() } fallback={ <AddBranchForm /> }>
        <AddInfo
          showForm={ showForm }
          setShowForm={ setShowForm }
        />
      </Show>
    </div>
  );
}

export default App;
