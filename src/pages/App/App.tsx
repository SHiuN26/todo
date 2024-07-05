import { useState,useEffect ,useRef} from 'react'
import { Todo } from '@/interfaces/Todo'
import { Button } from 'antd'



const App:React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  

  return (
    <>
      總代辦事項數量: {todos.length}
    </>
  )
}

export default App
