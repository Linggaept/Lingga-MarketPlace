import { useState } from 'react'
import { useEffect } from 'react'
import Card from '../components/card'
import Navbar from '../components/Navbar'

function App() {
  const token = localStorage.getItem('token')

  if(!token) {
    window.location.href = '/'
  }

  document.title = "Product"

  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setCards(json))
  }, [])

  try {
    return (
      <>
      <Navbar />
        <div className="mx-auto p-10 grid grid-cols-4" > 
          {cards.map((card) => (
          <Card key={card.id} card={card}/>
          ))
        }
        </div>
      </>
    )
  } catch (error) {
    return (
      <div className="mx-auto p-10 grid grid-cols-3" >
        <p className="text-4xl text-center" > Something went wrong </p>
      </div>
    )
  }

}

export default App