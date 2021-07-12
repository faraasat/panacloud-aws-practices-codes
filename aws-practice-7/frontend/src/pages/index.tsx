import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useQuery, useMutation, gql } from "@apollo/client"
import shortid from "shortid"

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`

const IndexPage = () => {
  const [title, setTitle] = React.useState("")
  let { data, loading } = useQuery(GET_TODOS)
  const [myData, setMyData] = React.useState(data)
  const [createNote] = useMutation(CREATE_TODO)

  const handleSubmit = async () => {
    const todo = {
      id: shortid.generate(),
      title,
      done: false,
    }
    console.log("Creating Todo:", todo)
    setTitle("")
    await createNote({
      variables: {
        todo,
      },
    })
    setMyData({ getTodos: [...data.getTodos, todo] })
    data = myData
  }

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <label>
          Todo:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <button onClick={() => handleSubmit()}>Create Todo</button>
        {loading && <h1>Loading ...</h1>}
        {!loading &&
          data &&
          data.getTodos.map(item => (
            <div
              style={{ marginLeft: "1rem", marginTop: "2rem" }}
              key={item.id}
            >
              {item.title} {item.done ? "DONE" : "NOT COMPLETED"}
            </div>
          ))}
      </div>
    </Layout>
  )
}

export default IndexPage
