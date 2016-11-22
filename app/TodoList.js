import React from 'react';
import styles from './css/main.css'

class TodoListPanel extends React.Component {
	GetItems (){
		return [];
	}

	render () {
		return (
			<div >
			<TodoTitle />
			<TodoBody />
			</div>);
		}
	}

	class CreateTodoListButton extends React.Component {
		CreateNewItem(){
		}
		render () {
			return <button className="createButton" onClick={this.CreateNewItem}>+</button>
		}
	}

	class TodoTitle extends React.Component {
		constructor(...args) {
			super(...args)
			this.state = {
				headtext : 'TodoHead1',
				buttonText: "修改",
				inputdisplay : 'none',
				titleDisplay : 'inline-block'
			}
			this.clicked = false;
		}

		ModifyTitle(){
			this.clicked = ~this.clicked
			if (this.clicked) {
				this.setState({
					headtext:'',
					buttonText:"确定",
					inputdisplay:'inline-block',
					titleDisplay : 'none'
				})
			} else {
				this.setState({
					buttonText:"修改",
					inputdisplay:'none',
					titleDisplay : 'inline-block'
				})
			}
		}

		handleChange(e) {
			this.setState({headtext:e.target.value})
		}

		render() {
			return (
				<div className={styles.titleCommon}>
				<span className={styles.todoTitle} style={{display:this.state.titleDisplay}}>{this.state.headtext} </span>
				<input type="text" style={{display:this.state.inputdisplay}} onChange={this.handleChange.bind(this)} />
				<span className={styles.titleButton} onClick={this.ModifyTitle.bind(this)}>{this.state.buttonText}</span>
				</div>);
		}
	}

	class TodoBody extends React.Component {
		render() {
			return <div>todobody</div>;
		}
	}

	class ToDoDialog extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				display : this.getShowOrHide()
			}
		}

		getShowOrHide(){
			return this.props.isOpen ?styles.dialogShow: styles.dialogHide
		}

		render() {
			return (<div className={this.state.display}>
						<span onClick={this.Close}>X</span>
						<input type="text" />
					</div>)
		}

	}

	class ToDoList extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				listItems : [],
				dialogShow : false
			}

		}

		CreateNewItem(){
			alert("sdaf")
			var show = ~this.state.dialogShow;
			this.setState({dialogShow : show})
		}

		render() {
			return <div className={styles.todoPanel}>
			<CreateTodoListButton onClick={this.CreateNewItem.bind(this)} />
			<TodoListPanel />
			<ToDoDialog isOpen={this.state.dialogShow} />	
			</div>;
		}
	}

	export default ToDoList;