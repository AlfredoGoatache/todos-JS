import Swal from "sweetalert2";
import { crearTodoHtml } from "../js/componentes";
import { Todo } from "./todo.class";

export class TodoList {

    divTodoList = document.querySelector('.todo-list');
    todos = [];
    filtro = 'todos';

    constructor() {}

    start = () => {
        this.cargarLocalStorage();
    }

    //Para agregar una tarea se usa este metodo
    nuevoTodo( todo ) {
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        this.todos.push( todo );
        this.guardarLocalStore(this.todos);
        this.filtrar(this.filtro);
    }
    //Para eliminar un tarea se usa este metodo
    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStore(this.todos);
    }
    //Para marcar las tareas realizadas se usa este metodo
    marcarCompletado( id ){

        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        for( const todo of this.todos ){

            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStore(this.todos);
                break;
            }

        }
        
    }
    //Para eliminar solo las tareas completadas se usa este metodo
    eliminarCompletados(divTodoList) {

        let children = divTodoList ? divTodoList.children : [];

        // console.log("eliminarCompletados", {
        //     divTodoList, 
        //     children: children,
        //     length: children.length
        // });

        for( let i = children.length - 1; i >=0; i-- ){
            console.log("eliminarCompletados for", {
                length: children.length,
                length_1: children.length - 1,
                i: i,
            });


            let li = children[i] ? children[i] : null;
            let classList = li ? li.classList : null;
            let is_checked = classList ? classList.contains('completed') : false;

            // console.log("eliminarCompletados for 2", {
            //     li: li,
            //     classList: classList,
            //     is_checked: is_checked
            // });

            if(!is_checked) continue;

            divTodoList.removeChild(li);
            // this.guardarLocalStore();

            // console.log("eliminarCompletados todos", this.todos);

            Swal.fire("¡Éxito!", "Ha borrado todas las tareas completadas", "success");
           
        }

        this.todos = this.todos.filter(todo => !todo.completado );

        localStorage.setItem('todos',JSON.stringify(this.todos) );
    }
    guardarLocalStore(todos){

        //console.log(todos);
        localStorage.setItem('todos',JSON.stringify(todos) );
        //console.log('cargarLocal: ', this.todos);
    }

    cargarLocalStorage() {
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        this.todos.forEach( crearTodoHtml );
        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
    }

    filtrar = (filtro) => {
        this.filtro = filtro;
        
        this.divTodoList.innerHTML = null;
        
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        switch (this.filtro) {
            case 'todos':
                this.todos.forEach( crearTodoHtml );
                break;

            case 'pendientes':
                this.todos = this.todos.filter((tarea)=> {
                    return !tarea.completado;
                });
                this.todos.forEach( crearTodoHtml );
                break;

            case 'completados':
                this.todos = this.todos.filter((tarea)=> {
                    return tarea.completado;
                });
                this.todos.forEach( crearTodoHtml );
                break;
        
            default:
                console.log("Filtrando Default", this.todos);
                break;
        }

    }
}







