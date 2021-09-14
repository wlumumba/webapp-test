//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

//import Amplify from './aws-amplify';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports"
import { getCar } from './graphql/queries';
import { updateCar } from './graphql/mutations';

Amplify.configure(awsExports)

function App() {

  //kinda like variable, setter
  const [carPrice, setCarPrice] = useState(0);

  async function fetchCarPrice(){
    try{
      const carData = await API.graphql(graphqlOperation(getCar, { id: 1 }))
      console.log(carData.data.getCar.price)
      
      const carPrice = carData.data.getCar.price
      
      //uses setter method
      setCarPrice(carPrice)
    }
    catch(err){
      console.log('error fetching car price')
      console.log(err)
    }
  }

  //Do this when page loads
  useEffect(() => {
    fetchCarPrice()
  }, [])

  async function updateCarPrice() {
    try{
      const carData = await API.graphql(graphqlOperation(getCar, { id: 1 }))
      const carPrice = carData.data.getCar.price + 1.0
      console.log("From updated:" + carData.data.getCar.price) 

      const updatedCar = await API.graphql(graphqlOperation(updateCar, { id: 1, price: carPrice }))
      console.log(updatedCar)
      setCarPrice(updatedCar.data.updateCar.price)
    }
    catch(err){
      console.log('error updating car price')
      console.log(err)
    }
  }

   return (
    <div className="App">
      <header className="App-header">
        <h1>SWE App Testing</h1>
        <h2>$ {carPrice} </h2>
        <button onClick={updateCarPrice}> Update Price</button>
        {/* <img src='logo512.png' alt='desc'></img> */}
      </header>
    </div>
  );
}

export default App;
