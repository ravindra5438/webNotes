import React, { useEffect } from "react"
import io from 'socket.io-client';


const socket = io('http://localhost:5000');


export default function Home() {

  useEffect(() => {

    console.log("ravindra")

    fetch('http://localhost:5000/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  },[])



  return (
        <>
          <h1>Ravindra</h1>
        </>
  )
}
