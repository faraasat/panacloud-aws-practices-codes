import React, { useState, useEffect, useRef } from "react"
import { addTodo } from "../graphql/mutations"
import { getTodos } from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify"
import { onAddTodo } from "../graphql/subscriptions"
import shortid from "shortid"
import Layout from "../components/layout"
import Seo from "../components/seo"

interface title {
  title: string
}

interface incomingData {
  data: {
    getTodos: title[]
  }
}

const IndexPage = () => {
  const [loading, setLoading] = useState(true)
  const [todoData, setTodoData] = useState<incomingData | null>(null)
  const [subscriptionTitle, setSubscriptiontitle] = useState<string>(
    "nothing available right now"
  )
  const [inputTitle, setInputTitle] = useState<string>("")
  const subscription = API.graphql(graphqlOperation(onAddTodo)) as any

  const addTodoMutation = async () => {
    try {
      const todo = { id: shortid(), title: inputTitle, done: false }
      const data = await API.graphql({
        query: addTodo,
        variables: { todo: todo },
      })
      setInputTitle("")
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTodos = async () => {
    try {
      const data = await API.graphql({ query: getTodos })
      setTodoData(data as incomingData)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  function handleSubscription() {
    subscription.subscribe({
      next: status => {
        // when mutation will run the next will trigger
        console.log("New SUBSCRIPTION ==> ", status.value.data)
        setSubscriptiontitle(status.value.data.onAddTodo.title)
        fetchTodos()
      },
    })
  }

  useEffect(() => {
    fetchTodos() //will fetch data for the first time
    handleSubscription() // will make a subscription connection for the first time
  }, [])

  return (
    <Layout>
      <Seo title="Index Page" />
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <label>
              <input
                type="text"
                value={inputTitle}
                onChange={e => {
                  setInputTitle(e.target.value)
                }}
                placeholder="Todo title"
              />
            </label>
            <button onClick={() => addTodoMutation()}>Add Todo</button>
            <ul>
              {todoData?.data.getTodos.map((item, ind) => (
                <li style={{ marginLeft: "1rem", marginTop: "1rem" }} key={ind}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginLeft: "5rem" }}>
            <h2>Latest Todo Title</h2>
            <p>{subscriptionTitle}</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
