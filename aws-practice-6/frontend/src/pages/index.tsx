import React, { useState, useRef, useEffect } from "react"
import { addTodo } from "../graphql/mutations"
import { getTodos } from "../graphql/queries"
import { API } from "aws-amplify"
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
  const todoTitleRef = useRef<any>("")

  const addTodoMutation = async () => {
    try {
      const todo = {
        id: shortid.generate(),
        title: todoTitleRef.current.value,
        done: false,
      }
      const data = await API.graphql({
        query: addTodo,
        variables: {
          todo: todo,
        },
      })
      todoTitleRef.current.value = ""
      fetchTodos()
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTodos = async () => {
    try {
      const data = await API.graphql({
        query: getTodos,
      })
      setTodoData(data as incomingData)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      <Seo title="Index Page" />
      <Layout>
        <div>
          {
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 40,
              }}
            >
              <div>
                <label>
                  Todo:
                  <input ref={todoTitleRef} />
                </label>
                <button onClick={() => addTodoMutation()}>Create Todo</button>
              </div>
              {loading ? (
                <h1>Loading ...</h1>
              ) : todoData === null ? (
                <div>No Data</div>
              ) : (
                todoData.data &&
                todoData.data.getTodos.map((item, ind) => (
                  <div
                    style={{ marginLeft: "1rem", marginTop: "2rem" }}
                    key={ind}
                  >
                    {item.title}
                  </div>
                ))
              )}
            </div>
          }
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
