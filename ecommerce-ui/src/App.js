import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import SignIn from './pages/SignIn';
// import Dashboard from './components/Dashboard/Dashboard';
// import SignUp from './pages/SignUp';
// import BoxComp from './components/Cart/CartPage';
// import FavoritesComp from './components/Favorites/FavoritesPage';
import  loadable  from 'react-loadable';
const loadingComponent = () =>{
    <h3>Loading please wait...</h3>
}
const SignIn  =  loadable({
    loader: ()=> import(/* webpackChunkName: 'SignInPage' */'./pages/SignIn'),
    loading: loadingComponent
})
const Dashboard  =  loadable({
    loader: ()=> import(/* webpackChunkName: 'Dashboard' */'./components/Dashboard/Dashboard'),
    loading: loadingComponent
})
const SignUp  =  loadable({
    loader: ()=> import(/* webpackChunkName: 'SignUpPage' */'./pages/SignUp'),
    loading: loadingComponent
})
const BoxComp  =  loadable({
    loader: ()=> import(/* webpackChunkName: 'BoxComp' */'./components/Cart/CartPage'),
    loading: loadingComponent
})
const FavoritesComp  =  loadable({
    loader: ()=> import(/* webpackChunkName: 'FavoritesComp' */'./components/Favorites/FavoritesPage'),
    loading: loadingComponent
})
function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/">
           <Dashboard />
          </Route>
          <Route exact path="/products">
           <Dashboard />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/cart">
           <BoxComp />
          </Route>
          <Route path="/favorites">
           <FavoritesComp />
          </Route>
          <Route path="/signup">
           <SignUp />
          </Route>
        </Switch>
      </div>
  );
}

export default App;

// import React from "react";
// import './App.css'
// import logo from "./logo.svg"
// // import Home from "./Home";
// // import About from "./About";
// import { Route,Link,Switch} from "react-router-dom";
// import loadable from 'react-loadable'
// const loadingComponent = () =>{
//     <h3>Loading please wait...</h3>
// }
// const Home  =  loadable({
//     loader: ()=> import(/* webpackChunkName: 'HomePage' */'./Home'),
//     loading: loadingComponent
// })
// const About  =  loadable({
//     loader: ()=> import(/* webpackChunkName: 'AboutPage' */'./About'),
//     loading: loadingComponent
// })
// const App = () => {
//     return (
//         <div>
//             <h1 className="error">hello world</h1>
//             <div>
//                 <button><Link to="/home">Home</Link></button>
//                 <button><Link to="/about">About</Link></button>
//             </div>
//             <Switch>
//                 <Route path="/home" component={Home} />
//                 <Route path="/about" component={About} />
//             </Switch>
//             <div style={{height: '200px', width: '200px'}}>
//                 <img  src={logo} alt="logo" />
//             </div>
//         </div>

        
//     );
// }
 
// export default App;