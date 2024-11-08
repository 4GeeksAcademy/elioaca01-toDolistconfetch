import React from "react";

//include images into your bundle
import TodoList from "./Todolist";


//create your first component
const Home = () => {
	return (
		<div className="container d-flex flex-column">
			<TodoList/>
		</div>
	);
};

export default Home;
