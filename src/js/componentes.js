import { Todo, TodoList } from "../class";
import { todoList } from "../index";

//Referencias en el HTML
const divTodoList 	= document.querySelector('.todo-list');
const txtInput 		= document.querySelector('.new-todo');
const btnBorrar 	= document.querySelector('.clear-completed');
const ulFiltros 	= document.querySelector('.filters')
const btn_todos = document.querySelector('#btn_todos');
const btn_pendientes = document.querySelector('#btn_pendientes');
const btn_completados = document.querySelector('#btn_completados');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
		 	<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template"> 
	</li>`;
	const div 		= document.createElement( 'div' );
	div.innerHTML 	= htmlTodo;

	divTodoList.append( div.firstElementChild );
	return div.firstElementChild;

}

//Eventos
txtInput.addEventListener('keyup', (event) => { 

	if ( event.keyCode === 13 && event.target.value.length > 0 ) {

		const nuevoTodo = new Todo( txtInput.value );
		todoList.nuevoTodo( nuevoTodo );

		txtInput.value = '';
	}
 });

divTodoList.addEventListener('click', (event) => {

	const nombreElemento = event.target.localName;
	const todoElemento 	 = event.target.parentElement.parentElement;
	const todoId 		 = todoElemento.getAttribute('data-id');
	
	if( nombreElemento.includes('input')){
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed');
	}else if( nombreElemento.includes('button') ){

		todoList.eliminarTodo( todoId );
		divTodoList.removeChild( todoElemento );
	}

});

btnBorrar.addEventListener('click', (event) => {

	//console.log("btnBorrar addEventListener event", event);

	todoList.eliminarCompletados(divTodoList);

	

});

// ulFiltros.addEventListener('click', (event) => {
// 	const filtro = event.target.text;

// 	console.log("addEventListener", filtro);


// 	if( !filtro ) {return;}

// 	for( const elemento of divTodoList.children ){
// 		console.log(elemento);
// 	}


// });

btn_todos.addEventListener('click', (event) => {
	todoList.filtrar("todos");
});

btn_pendientes.addEventListener('click', (event) => {
	todoList.filtrar("pendientes");
});

btn_completados.addEventListener('click', (event) => {
	todoList.filtrar("completados");
});