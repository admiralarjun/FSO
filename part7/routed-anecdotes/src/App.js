import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      info: 'http://wiki.c2.com/?PrematureOptimization',
      author: 'Donald Knuth',
      content: 'Premature optimization is the root of all evil',
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} created successfully !`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create_new">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <Notification notification={notification} />
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
