import { useEffect, useRef, useState } from "react";
const Todo = () => {
  const LOCAL_STORAGE_KEY = "TODOS";
  const [todos, setTodos] = useState(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value == null) return [];
    return JSON.parse(value);
  });

  const [isAddTodo, setAddTodo] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (selectedItem.length !== 0) {
      inputRef.current.value = selectedItem.name;
    }
  }, [selectedItem]);

  const handleAddTodos = () => {
    if (!isEditMode) {
      if (inputRef.current.value === "") return;
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          {
            id: crypto.randomUUID(),
            name: inputRef.current.value,
            completed: false,
          },
        ];
      });
      setAddTodo(false);
    } else if (isEditMode) {
      // setEditMode(false);
      // const updatedList = todos.map(
      //   (item) =>
      //     item.id === selectedItem[0].id &&
      //     setTodos(...todos, { ...item, title: inputRef.current.value })
      // );
      // const tempTodos = [...todos];
      // const index = tempTodos.findIndex((q) => q.id === selectedItem[0].id);
      // const updatedTitle = inputRef.current.value;
      // tempTodos[index].name = updatedTitle;
      // setTodos(tempTodos);

      const updatedName = inputRef.current.value;
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === selectedItem.id) {
            return { ...todo, name: updatedName };
          }
          setSelectedItem([]);
          return todo;
        });
      });
      setEditMode(false);
    }
    setAddTodo(false);
    // inputRef.current.value = "";
  };

  const handleEdit = (item) => {
    setAddTodo(true);
    setEditMode(true);
    // const selectedItem = todos.filter((q) => q.id === item.id);
    // setSelectedItem(selectedItem);
    // if (isAddTodo) {
    //   inputRef.current.value = selectedItem[0].name;
    // }
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === item.id) {
          setSelectedItem(todo);
        }
        return todo;
      });
    });
    if (selectedItem.length !== 0) {
      inputRef.current.value = selectedItem.name;
    }
  };

  const handleToggleTodo = (todoId, completed) => {
    setTodos((currentTodo) => {
      return currentTodo.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed };
        return todo;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="w-4/5 bg-slate-200 m-auto text-center my-10 rounded p-5">
      <div className="bg-slate-400 flex justify-between items-center shadow p-3 rounded">
        {!isEditMode ? (
          <button
            onClick={() => {
              setAddTodo(!isAddTodo);
              setEditMode(false);
            }}
            className="bg-slate-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Add Task</span>
          </button>
        ) : (
          <h1 className="text-2xl font-bold">Update Selected Task</h1>
        )}

        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>
      <div className="p-3">
        {isAddTodo && (
          <form className="w-full ">
            <div className="flex items-center border-b border-slate-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter New Task"
                aria-label="Full name"
                ref={inputRef}
              />
              <button
                className="flex-shrink-0 bg-slate-500 hover:bg-slate-700 border-slate-500 hover:border-slate-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={handleAddTodos}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-slate-500 hover:text-slate-800 text-sm py-1 px-2 rounded"
                type="button"
                onClick={() => {
                  setAddTodo(false);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="p-3">
        {todos.length > 0
          ? todos.map((item) => {
              return (
                <div key={item.id} className="flex justify-between mb-2">
                  <div className="mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem] flex items-center justify-center">
                    <input
                      className="relative float-left -ml-[1.4rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] cursor-none appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] indeterminate:border-primary indeterminate:bg-primary indeterminate:after:absolute indeterminate:after:ml-[0.2rem] indeterminate:after:mt-[6px] indeterminate:after:w-[0.5rem] indeterminate:after:border-[0.05rem] indeterminate:after:border-solid indeterminate:after:border-white hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent indeterminate:focus:after:w-[0.5rem] indeterminate:focus:after:rounded-none indeterminate:focus:after:border-[0.125rem] indeterminate:focus:after:border-b-0 indeterminate:focus:after:border-l-0 indeterminate:focus:after:border-r-0 dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-teal-500 dark:indeterminate:border-primary dark:indeterminate:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(125,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value=""
                      id="TodoItem"
                      checked={item.completed}
                      onChange={(e) =>
                        handleToggleTodo(item.id, e.target.checked)
                      }
                    />
                    <label
                      className={`inline-block pl-[0.15rem] hover:cursor-pointer ${
                        item.completed && "line-through"
                      }`}
                      htmlFor="TodoItem"
                    >
                      {item.name}
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-shrink-0 bg-teal-700 hover:bg-teal-900 border-teal-700 hover:border-teal-900 text-sm border-4 text-white px-2 rounded"
                      type="button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white px-2 rounded"
                      type="button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : "Please Add Todos"}
      </div>
    </div>
  );
};

export default Todo;
