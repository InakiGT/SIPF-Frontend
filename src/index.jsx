/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';

import './index.css';
import App from './App';
import Login from './Login';
import Header from './components/Header';
import BuyOrder from './BuyOrder';
import Order from './Order';
import Sells from './Sells';
import Products from './Products';
import Product from './Product';
import NewProduct from './NewProduct';
import Inventory from './Inventory';
import InventoryTweaks from './InventoryTweaks';
import InventoryTweakGeneral from './InventoryTweakGeneral';
import NewInvenroryTweak from './NewInventoryTweak';
import Bills from './Bills';
import NewBill from './NewBill';
import Bill from './Bill';
import SupplierPayment from './SupplierPayment';
import Suppliers from './Suppliers';
import NewSupplier from './NewSupplier';
import Supplier from './Supplier';
import Brands from './Brands';
import NewBrand from './NewBrand';
import Brand from './Brand';
import Tests from './Tests';
import SideMenu from './components/SideMenu';
import { createSignal } from 'solid-js';
import Categories from './Categories';
import Category from './Category';
import SupplierTypes from './SupplierTypes';
import NewCategory from './NewCategory';
import InventoryItem from './InventoryItem';
import NewEntrance from './NewEntrance';
import PaymentTerms from './PaymentTerms';
import PaymentTerm from './PaymentTerm';
import NewPaymentTerm from './NewPaymentTerm';
import SupplierType from './SupplierType';
import Apartments from './Apartments';
import Apartment from './Apartment';
import NewApartment from './NewApartment';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const [ showMenu, setShowMenu ] = createSignal(false);

const Navigate = ( props ) => {
  const shouldRenderHeader = props.location.pathname !== '/login'; // Check for login path

  return (
    <>
      { shouldRenderHeader && <Header setShowMenu={ setShowMenu } showMenu={ showMenu } /> }
      { shouldRenderHeader && <SideMenu setShowMenu={ setShowMenu } showMenu={ showMenu } /> }
      { props.children }
    </>
  );
};

render(() => (
  <Router root={ Navigate }>
    <Route path='/' component={ App } />
    <Route path='/login' component={ Login } />
    <Route path='/buy-order' component={ BuyOrder } />
    <Route path='/order' component={ Order } />
    <Route path='/sells' component={ Sells } />
    <Route path='/products' component={ Products } />
    <Route path='/product' component={ Product } />
    <Route path='/new-product' component={ NewProduct } />
    <Route path='/categories' component={ Categories } />
    <Route path='/category' component={ Category } />
    <Route path='/new-category' component={ NewCategory } />
    <Route path='/inventory' component={ Inventory } />
    <Route path='/inventory-item' component={ InventoryItem } />
    <Route path='/inventory-tweaks' component={ InventoryTweaks } />
    <Route path='/inventory-tweak-general' component={ InventoryTweakGeneral } />
    <Route path='/new-inventory-tweak' component={ NewInvenroryTweak } />
    <Route path='/new-inventory-entrance' component={ NewEntrance } />
    <Route path='/bills' component={ Bills } />
    <Route path='/bill' component={ Bill } />
    <Route path='/new-bill' component={ NewBill } />
    <Route path='/supplier-payment' component={ SupplierPayment } />
    <Route path='/suppliers' component={ Suppliers } />
    <Route path='/supplier' component={ Supplier } />
    <Route path='/supplier-types' component={ SupplierTypes } />
    <Route path='/supplier-type' component={ SupplierType } />
    <Route path='/payment-terms' component={ PaymentTerms } />
    <Route path='/payment-term' component={ PaymentTerm } />
    <Route path='/new-payment-term' component={ NewPaymentTerm } />
    <Route path='/new-supplier' component={ NewSupplier } />
    <Route path='/brands' component={ Brands } />
    <Route path='/brand' component={ Brand } />
    <Route path='/new-brand' component={ NewBrand } />
    <Route path='/apartments' component={ Apartments } />
    <Route path='/apartment' component={ Apartment } />
    <Route path='/new-apartment' component={ NewApartment } />


    <Route path='/tests' component={ Tests } />
  </Router>
), root);
