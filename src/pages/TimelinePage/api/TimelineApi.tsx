import { postApiAxiosClient } from '../../../shared/utils/axiosClient';
import { Post } from '../model/article';

// fetch 함수들을 여기에 작성
export const getArticles = async (): Promise<Post[]> => {
  try {
    const response = await postApiAxiosClient.get<Post[]>(`/posts/channel/66f50d3001d4aa076bcbdb99`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

/* 
const fetchTodo = () => {
  return fetch("http://localhost:3300/api/todo").then((response) =>
    response.json()
  );
};

function TodoFetchingNode() {
  const queryClient = useQueryClient();

  const updateTodoStatus = async (todo) => {
    const response = await axios.put(
      `http://localhost:3300/api/todo/${todo?.id}`,
      { status: !todo.status }
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,

    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error Creating Todo:", error);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodoStatus,

    onSuccess: (result) => {
      console.log("Todo created successfully:", result);

      //아이템 추가 후 데이터를 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    //네트워크 문제, 서버에러, 유효성 검사 실패 등
    onError: (error) => {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again");
    },
  });

  function changeHandler(todo) {
    updateTodoMutation.mutate(todo);
  }

  return (
    <>
      <h3>이번 주 할 일 리스트</h3>
      {data?.map((todo) => (
        <p key={todo?.id}>
          <input
            type="checkbox"
            checked={todo?.status}
            onChange={() => changeHandler(todo)}
          />
          {todo.text}
        </p>
      ))}
    </>
  );
}

const addItem = async (newItem) => {
  const response = await axios.post("http://localhost:3300/api/add", newItem);
  return response.data;
};

const UseMutationEx = () => {
  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (result) => {
      console.log("Todo Created Successfully:", result);
    },
    onError: (error) => {
      console.error("Error Creating Todo:", error);
    },
  });

  const sendData = () => {
    const newTodo = prompt("새로운 할일을 입력하세요");

    if (newTodo) {
      addItemMutation.mutate({ text: newTodo });
    }
  };

  return (
    <div>
      <h1>할 일 추가</h1>
      <button onClick={sendData}>Add Todo</button>
    </div>
  );
};

const functions = { TodoFetchingNode, UseMutationEx }; 
export default functions;*/
