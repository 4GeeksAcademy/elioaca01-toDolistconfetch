import React, { useState, useEffect } from "react";

let inicialTask = {
    label: "",
    is_done: false
}

const urlBase = "https://playground.4geeks.com/todo/"

const TodoList = () => {

    const [task, setTask] = useState(inicialTask)
    const [taskList, setTaskList] = useState([])


    function handleChange({ target }) {
        setTask({
            ...task,
            label: target.value
        })
    }

    const addTask = async (evt) => {
        if (evt.key == "Enter") {
            try {
                const response = await fetch(urlBase + "todos/elio", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(task) //le pasas la tarea para que la vuelva un string de json para la api
                })

                if (response.ok) {
                    getAllTasks()
                    setTask(inicialTask)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    const createUser = async () => {
        try {
            const response = await fetch(urlBase + "users/elio", {
                method: "POST"
            })

            if (response.ok) {
                console.log("Usuario Creado")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTasks = async () => {
        try {
            const response = await fetch(urlBase + "users/elio")
            const data = await response.json()

            if (response.ok) {
                setTaskList(data.todos)
            } else {
                createUser()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // function deleteTask(id){
    //     let newTaskList = taskList.filter((item,index) => index!=id)
    //     setTaskList(newTaskList);
    // }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${urlBase}todos/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                getAllTasks()
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllTasks()
    }, [])


    return (
        <>
            <h1 className="text align-self-center align-items-center ">todos</h1>
            <div className="container d-flex flex-column sombra">
                <div className=" align-self-center ">
                    <input
                        type="text"
                        placeholder="Write a new task"
                        className="input-task ps-3 fs-3 bg-light"
                        name="label"
                        onKeyDown={addTask}
                        onChange={handleChange}
                        value={task.label}

                    />

                </div>

                {
                    taskList.length == 0 ?  <div className="input-task ps-3 fs-4 bg-light fw-lighter border-top align-self-center">
                        you dont have pending tasks
                    </div> :
                    
                    taskList.map((item, index) => {
                        return (
                            <div className="input-task d-flex task ps-3 fs-4 bg-light fw-light border-top align-self-center"
                                key={item.id}
                                onClick={() => deleteTask(item.id)}
                            >
                                {item.label}
                                <span className="icono-x"><i className="fa-solid fa-x icon"></i></span>
                            </div>
                        )
                    })
                }

                <div className="footer pt-2 border-top bg-light align-self-center">
                    <p className="ms-3">{taskList.length} items left</p>
                </div>
            </div>
        </>
    )
}

export default TodoList
