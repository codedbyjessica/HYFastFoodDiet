import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, Link } from 'react-router';
import { ajax } from "jquery";
import DietItem from "./dietItem";

const config = {
	apiKey: "AIzaSyCut2SB5QB85C97vjnzaAG1pPJeDssUzfA",
	authDomain: "fastfooddiet-ead2e.firebaseapp.com",
	databaseURL: "https://fastfooddiet-ead2e.firebaseio.com",
	storageBucket: "fastfooddiet-ead2e.appspot.com",
	messagingSenderId: "169182799614"
};
firebase.initializeApp(config);

//////////////////////////////////////userMeals={this.state.userMeals}///////////////////////////PASS THIS PROP SOMEWHERE!!!

class User extends React.Component{
	constructor(){
		super();
		this.state = {
			userMeals:[]
		}
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if(user){

				const userId = firebase.auth().currentUser.uid

				const dbRef = firebase.database().ref(userId)
				dbRef.on("value", (firebaseData) => {
					console.log("firebasedataval", firebaseData.val());
					const mealsArray =[];
					const mealsData= firebaseData.val();

					for(let mealKey in mealsData) {
						mealsData[mealKey].key = mealKey
					console.log("mealkey", mealsData[mealKey].key);
						mealsArray.push(mealsData[mealKey])
					}
					console.log("mealsarray", mealsArray)
					this.setState({
						userMeals: mealsArray
					})
				})
			}
		})
	}
	removeMeal(mealToRemove){
		console.log("meal to remove", mealToRemove);
		const dbRef = firebase.database().ref(firebase.auth().currentUser.uid + "/" + mealToRemove);
		dbRef.remove();
	}
	render(){
		return (
			<div className="userPage">
				<div className="sideBar">
					<p><Link to="/resources"><i className="fa fa-book" aria-hidden="true"></i></Link></p>
					<p><a href="https://twitter.com/intent/tweet?text=Plan%20your%20fast%20food%20meals%20with%20health%20in%20mind!%20http://codedbyjessica.com/fastfooddiet%20developed%20by%20@codedbyjessica" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></p>
				</div>
				<aside className="mealsContent">
					<h1>My Saved Meals</h1>
					<div className="userMeals">
					{this.state.userMeals.map((userMeal) => { 
						console.log("usermeal",userMeal.key);
						console.log("usermeal 1", userMeal.userMeal)
						return(
							<div className="eachMeal" key={userMeal.key}> 
								<h2>My Meal</h2>
								<button onClick={() => this.removeMeal(userMeal.key)}>Remove Meal</button>
								{userMeal.userMeal.map((userMealItem, i) =>{
									return(
									<div className="myDietItem" key={i}>
										<h4>{`${userMealItem[1]} from ${userMealItem[0]}`}</h4>
										<p>{`Calories: ${userMealItem[2]}kcal`} | {`protein: ${userMealItem[5]}g`}</p>
										<p>{`carbs: ${userMealItem[6]}mg`} | {`fat: ${userMealItem[7]}g`}</p>
										<p>{`sodium: ${userMealItem[4]}mg`} | {`Sugars: ${userMealItem[3]}g`}</p>
									</div>
									)
								})}
							</div>
						)
					})}
					</div>
				</aside>
			</div> 
		)
	}
}

class App extends React.Component {
	render(){
		return(
			<div className="container">
				<header>
					<div className="logo">
						<Link to="/"><svg>
							<g>
								<path fill="#BF8773" d="M99.369,41c0,4.156-3.343,8-7.468,8H8.1c-4.125,0-7.469-3.844-7.469-8l0,0c0-4.156,3.343-8,7.469-8h83.802
								C96.026,33,99.369,36.844,99.369,41L99.369,41z"/>
								<path fill="#BF8773" d="M50.307,53h-0.612H5.231c0,9,4.479,17,8.474,17H49.39h1.222h35.684c3.996,0,8.475-8,8.475-17H50.307z"/>
								<path fill="#BF8773" d="M50.001,0.777C25.289,0.777,5.255,13,5.255,30c15.685,0,75.996,0,89.491,0
								C94.746,13,74.712,0.777,50.001,0.777z M19.328,22.972c-1.242,0-2.248-1.006-2.248-2.248c0-1.241,1.006-2.247,2.248-2.247
								s2.248,1.006,2.248,2.247C21.576,21.966,20.57,22.972,19.328,22.972z M25.583,15.153c-1.241,0-2.248-1.007-2.248-2.248
								c0-1.242,1.007-2.248,2.248-2.248c1.242,0,2.249,1.006,2.249,2.248C27.831,14.146,26.824,15.153,25.583,15.153z M29.688,23.95
								c-1.242,0-2.248-1.008-2.248-2.248c0-1.242,1.006-2.249,2.248-2.249c1.241,0,2.247,1.007,2.247,2.249
								C31.935,22.942,30.929,23.95,29.688,23.95z"/>
							</g>
						</svg></Link>
					</div>
					<div className="mainNav">
						<nav>
							<Link to="/"><i className="fa fa-calculator" aria-hidden="true"></i></Link>
							<Link to="/user"><i className="fa fa-list" aria-hidden="true"></i></Link>
						</nav>
						<Auth />
					</div>
				</header>
			{this.props.children || <Main />}
			<Footer />
			</div>
		)
	}
}

class Auth extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: 'hello',
			email: '',
			password: '',
			confirm: ''
		};
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
	}
	componentDidMount(){

	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className
		});
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signup(e) {
		e.preventDefault();
		console.log("signing...");
		console.log(this.state.email,this.state.password,this.state.confirm);
		if(this.state.password=this.state.confirm){
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
					var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorMessage);
						console.log(error);
				})
				// .then((userData) => {
				// 	console.log("userData")
				// 	console.log(this.state.email)
				// 	this.setState({
				// 		formToShow: "hello"
				// 	});
				// });
		}
	}
	login(e) {
		e.preventDefault();
		firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
					var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorMessage);
						console.log(error);
				})

			// .then((userData) =>{ 
			// 	alert("Welcome", this.state.email)
			// })
	}
	signout(e){
		e.preventDefault();
		firebase.auth()
			.signOut()
			.then(() => {
			alert("Successfully signed out")
		});
		location.reload();
	}
	render() {
		let loginForm = '';
		if(this.state.formToShow === 'signup') {
			loginForm = (
				<div className="loginForms">
					<form onSubmit={this.signup} className="user-form">
						<div>
							<label htmlFor="email">Email: </label>
							<input type="email" name="email" onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input type="password" name="password" onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="confirm">Confirm: </label>
							<input type="password" name="confirm" onChange={this.handleChange} />
						</div>
						<button>Sign In</button>
					</form>
				</div>
			);
		}
		else if(this.state.formToShow === "login") {
			loginForm = (
				<div className="loginForms">
					<form onSubmit={this.login} className="user-form">
						<div>
							<label htmlFor="email">Email: </label>
							<input type="email" name="email" onChange={this.handleChange}/>
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input type="password" name="password" onChange={this.handleChange}/>
						</div>
						<button>Log In</button>
					</form>
				</div>
			);
		}
		else if(this.state.formToShow === "hello") {
			loginForm = (
				<div className="hello">
					<h3> Log in or sign up to customize your own fast food diet!</h3>
				</div>
			);
		}
		//hide login/logout buttons depending on user
		let login = ""
		let logout = ""
		if(firebase.auth().currentUser !== null){
			logout += "displayBlock"
		} else {
			logout += "displayNone"
		};
		if(firebase.auth().currentUser !== null){
			login += "displayNone"
		} else {
			login += "displayBlock"
		};
		//make buttons dead/become the headings
		let signupid=""
		let loginid=""
		if(this.state.formToShow === 'signup'){
			signupid += "buttonOn"
		} else {
			signupid += ""
		};
		if(this.state.formToShow === 'login'){
			loginid += "buttonOn"
		} else {
			loginid += ""
		};
		return (
			<div className="loginOptions">
				<div className={login}>
					<button className="signup" id={signupid} onClick={this.formToShow}>Sign Up</button>
					<button className="login" id={loginid} onClick={this.formToShow}>Log In</button>
				</div>
				<div className={logout}>
					Welcome! <button className="signout" onClick={this.signout}>Log Out</button>
				</div>
				<div>
				{loginForm}
				</div>
			</div>
		)
	}
}

class Main extends React.Component {
	constructor(){
		super();
		this.state = {
			foods: [],
			brand:"",
			search:"",
			itemInfo:["Please select","an item",0,0,0,0,0,0],
			myDietItems:[],
			totalCount:["","",0,0,0,0,0,0],
			userMeals:[]
		}
		this.addToDiet = this.addToDiet.bind(this);
		this.removeFromDiet = this.removeFromDiet.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}
	addToDiet(e){
		e.preventDefault();
		const dietState = Array.from(this.state.myDietItems);
		//I have a bunch of arrays in one array
		// take those arrays and add values of the same index
		dietState.push(this.state.itemInfo);
		const totalCount = dietState.reduce(function (r, a) {
			a.forEach(function (b, i) {
				r[i] = (r[i] || 0) + b;
			}); return r;
		}, []);
		this.setState({
			myDietItems: dietState,
			totalCount: totalCount
		});
	}
	removeFromDiet(dietIndex){
		const dietState = Array.from(this.state.myDietItems);
		dietState.splice(dietIndex,1);
		const totalCount = dietState.reduce(function (r, a) {
			a.forEach(function (b, i) {
				r[i] = (r[i] || 0) + b;
			}); return r;
		}, []);
		this.setState({
			myDietItems: dietState,
			totalCount: totalCount
		});
	}
	clearAll(e){
		this.setState({
			myDietItems:[],
			totalCount:["","",0,0,0,0,0,0],
		});
	}
	addAll(e){
		e.preventDefault();
		const dietState = Array.from(this.state.myDietItems);

		const usersMeal ={
			userMeal: dietState
		}
		this.setState({
			userMeal: "",
			myDietMeals:[],
			totalCount:["","",0,0,0,0,0,0],
			myDietItems:[]
		});
		const userId = firebase.auth().currentUser.uid
		const dbRef = firebase.database().ref(userId)
		dbRef.push(usersMeal)
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		// console.log(e.target.value)
	}
	handleRadioChange(e){
		// console.log(e.target);
		this.setState({
			brand: e.target.value
		});
	}
	render() {
		return(
		<div>
				<section>
					<div className="sideBar">
						<p><Link to="/resources"><i className="fa fa-book" aria-hidden="true"></i></Link></p>
						<p><a href="https://twitter.com/intent/tweet?text=Plan%20your%20fast%20food%20meals%20with%20health%20in%20mind!%20http://codedbyjessica.com/fastfooddiet%20developed%20by%20@codedbyjessica" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></p>
					</div>
					<CalculateNutrients 
						calories={this.state.totalCount[2]} 
						proteins={this.state.totalCount[5]} 
						carbs={this.state.totalCount[6]} 
						fats={this.state.totalCount[7]} 
						sodium={this.state.totalCount[4]} 
						sugars={this.state.totalCount[3]}
					/>
					<article className="searchFormDiv box">
						<h1> search</h1>
						<div>
							<form className="searchForm" onSubmit={(e) => this.searchFoods(e, this.state.search, this.state.brand)}>
								<div className="brandInputs">
								<div className="foodsBrand">
									<input type="radio" name="brand" id="mcdonalds" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000053"/>
									<label htmlFor="mcdonalds"><img className="brandLogos" src="/brandLogos/mcdonalds.png" alt="McDonalds"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="kfc" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00001e"/>
									<label htmlFor="kfc"><img className="brandLogos" src="/brandLogos/kfc.png" alt="KFC"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="burgerking" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000a"/>
									<label htmlFor="burgerking"><img className="brandLogos" src="/brandLogos/bk.png" alt="Burger King"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="wendys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000f"/>
									<label htmlFor="wendys" ><img className="brandLogos" src="/brandLogos/wendys.png" alt="Wendy's"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="aw" onChange={this.handleRadioChange} value="51db37b8176fe9790a898af4"/>
									<label htmlFor="aw" ><img className="brandLogos" src="/brandLogos/aw.png" alt="A&W"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="arbys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000023"/>
									<label htmlFor="arbys"><img className="brandLogos" src="/brandLogos/arbys.png" alt="Arby's"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="tims" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000094"/>
									<label htmlFor="tims"><img className="brandLogos" src="/brandLogos/tims.png" alt="Tim Hortons"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="dairyqueen" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000027"/>
									<label htmlFor="dairyqueen" ><img className="brandLogos" src="/brandLogos/dq.png" alt="Dairy Queen"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="fiveguys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00003f"/>
									<label htmlFor="fiveguys" ><img className="brandLogos" src="/brandLogos/fiveguys.png" alt="Five Guys"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="tacobell" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000020"/>
									<label htmlFor="tacobell" ><img className="brandLogos" src="/brandLogos/taco.png" alt="Taco Bell"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="popeyes" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000029"/>
									<label htmlFor="popeyes" ><img className="brandLogos" src="/brandLogos/popeyes.png" alt="Popeyes"/></label>
								</div>
								<div className="foodsBrand">
									<input type="radio" name="brand" id="newyorkfries" onChange={this.handleRadioChange} value="521b95444a56d006cae29a0e"/>
									<label htmlFor="newyorkfries" ><img className="brandLogos" src="/brandLogos/nyf.png" alt="New York Fries"/></label>
								</div>
								</div>
								<div>
									<input type="text" name="search" id="search" placeholder="Search item" onChange={this.handleChange} value={this.state.search}/>
									<button>Search</button>
								</div>
							</form>
						</div>
					</article>
				</section>
				<main>
					<div className="sideBar"> <div>&copy; 2017 <a href="http://codedbyjessica.com/" target="_blank">Coded By Jessica</a> | Powered by <a href="https://www.nutritionix.com/business/api" target="_blank">Nutritionix API</a></div> </div>
					<article className="itemsList box">
						<div>
							<h2>{`Showing results for ${this.state.search}`}</h2>
								{this.state.foods.map((food) => {
								return(
									<div key={food._id} className="itemsList__food">
										<p onClick={(e) => this.searchItem(e, food.fields.item_id)}>
										{`${food.fields.item_name}`}
										</p>
									</div>
								)
								})}
						</div>
					</article>
					<article className="itemInfoCard box">
						<div className="itemInfo">
							<h2>{`${this.state.itemInfo[0]}`}</h2>
							<h3>{`${this.state.itemInfo[1]}`}</h3>
							<h4>{`Calories: ${this.state.itemInfo[2]}kcal`}</h4>
							<h4>{`Protein: ${this.state.itemInfo[5]}g`}</h4>
							<h4>{`Carbs: ${this.state.itemInfo[6]}g`}</h4>
							<h4>{`Fat: ${this.state.itemInfo[7]}g`}</h4>
							<h4>{`Sodium: ${this.state.itemInfo[4]}mg`}</h4>
							<h4>{`Sugars: ${this.state.itemInfo[3]}g`}</h4>
						</div>
						<div className="itemAdd">
							<button onClick={this.addToDiet}> Add to my diet</button>
						</div>
					</article>
					<article className="myDiet box">
						<div>
							<h2>My Diet</h2>
							<div className="myDietTotalCount">
								<h4>Total Count</h4>
								<p>Calories: <span>{`${this.state.totalCount[2] || 0}`}</span>kcal | Proteins: <span>{`${this.state.totalCount[5] || 0}`}</span>g</p>
								<p>Carbs: <span>{`${this.state.totalCount[6] || 0}`}</span>g | Fats: <span>{`${this.state.totalCount[7] || 0}`}</span>g</p>
								<p>Sodium: <span>{`${this.state.totalCount[4] || 0}`}</span>mg | Sugars: <span>{`${this.state.totalCount[3] || 0}`}</span>g</p>
							</div>
						</div>
						<button className="myDietClearAll" onClick={(e) => this.clearAll(e)}>Clear All</button>
						<button className="myDietAddAll" onClick={(e) => this.addAll(e)}>Save to my meals!</button>
						{this.state.myDietItems ? 
						<MyDietSection 
							myDietItemsState={this.state.myDietItems}
							remove={this.removeFromDiet}
						/>: ""}
					</article>
				</main>
			</div>
		)
	}
	searchFoods(e,search, brand){
		e.preventDefault();
		if(this.state.search !=="" && this.state.brand !==""){
			ajax({
				url: `https://api.nutritionix.com/v1_1/search/${search}?`,
				data: {
					appId: `f109a1ae`,
					appKey: `1509d9d17bf6d351eac532db57502e5e`,
					results:`0:50`,
					fields:`*`,
					brand_id: this.state.brand
				},
				method: "GET",
				dataType: "json"
			})
			.then((data) => {
				this.setState({
					foods: data.hits
				});
			});
		} else {
			alert("bro plz");
		}
	}
	searchItem(e,itemId){
		e.preventDefault();
		ajax({
			url: `https://api.nutritionix.com/v1_1/item/`,
			data: {
				appId: `f109a1ae`,
				appKey: `1509d9d17bf6d351eac532db57502e5e`,
				id: itemId
			},
			method: "GET",
			dataType: "json"
		})
		.then((data) => {
			this.setState({
				itemInfo:[
					data.brand_name,
					data.item_name,
					data.nf_calories,
					data.nf_sugars,
					data.nf_sodium,
					data.nf_protein,
					data.nf_total_carbohydrate,
					data.nf_total_fat
				]
			});
		});
	}
}

class MyDietSection extends React.Component{
	render(){
		return(
		<aside className="myDietSection">
		{this.props.myDietItemsState.map((myDietItem, i) => { 
			return(
				<div className="myDietItem" key={i}>
					<h4>{`${myDietItem[1]} from ${myDietItem[0]}`}</h4>
					<p>{`Calories: ${myDietItem[2]}kcal`} | {`protein: ${myDietItem[5]}g`}</p>
					<p>{`carbs: ${myDietItem[6]}mg`} | {`fat: ${myDietItem[7]}g`}</p>
					<p>{`sodium: ${myDietItem[4]}mg`} | {`Sugars: ${myDietItem[3]}g`}</p>
					<DietItem key={i} myDietItem={myDietItem} remove={this.props.remove} dietIndex={i} />
				</div>
			)
		})}
		</aside>
		)
	}
}

//////////////////////////////////////////////////////////////////////////////////

class CalculateNutrients extends React.Component {
	constructor(){
		super();
		this.state = {
			height: 0,
			weight: 0,
			age:0,
			sex:"",
			activity:"",
			caloriesNeeded:0,
			proteinNeeded:0,
			fatNeeded:0,
			carbsNeeded:0,
			visible: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.ShowMyNutrients = this.ShowMyNutrients.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render(props) {
		return(
			<div className="myInfo box">
				<h1>My info</h1>
				<form className="myInfoForm" onSubmit={(e) => this.calculateNeeded(e, this.state.sex, this.state.weight, this.state.height, this.state.age)}>
				<div className="myInfoTop">
					<input type="radio" name="sex" value="male" id="male" onChange={this.handleChange} /><label htmlFor="male">Male</label>
					<input type="radio" name="sex" value="female" id="female" onChange={this.handleChange} /><label htmlFor="female">Female</label>
				</div>
				<div>
					Age:
					<input type="text" name="age" className="numberInput" placeholder="Age" onChange={this.handleChange} />
					Weight(kg)
					<input type="text" name="weight" className="numberInput" placeholder="Weight(kg)" onChange={this.handleChange} />
					Height(cm)
					<input type="text" name="height" className="numberInput" placeholder="Height(cm)" onChange={this.handleChange} />
				</div>
				<div>
					Exercise level:
					<input type="radio" name="activity" value="low" id="low" onChange={this.handleChange} /> <label htmlFor="low">Low</label>
					<input type="radio" name="activity" value="medium" id="medium" onChange={this.handleChange} /> <label htmlFor="medium">Medium</label>
					<input type="radio" name="activity" value="high" id="high" onChange={this.handleChange} /> <label htmlFor="high">High</label>
				</div>
				<div><button onClick={this.ShowMyNutrients}>Submit</button></div>
				</form>


				{
					this.state.visible
					? <NutrientsToAdd 
					caloriesNeeded={this.state.caloriesNeeded}
					calories={this.props.calories}
					proteinNeeded={this.state.proteinNeeded}
					proteins={this.props.proteins}
					carbsNeeded={this.state.carbsNeeded}
					carbs={this.props.carbs}
					fatNeeded={this.state.fatNeeded}
					fats={this.props.fats}
					sodium={this.props.sodium}
					sugars={this.props.sugars}
					/>
					: null
				}
			</div>
		)
	}
	ShowMyNutrients(){
		this.setState({
			visible: true
		});
	}
	calculateNeeded(e){
		e.preventDefault();
		if(this.state.sex === "female"){
			var bmr = 655.1 + (9.6*this.state.weight) + 1.9*this.state.height - 4.7*this.state.age
		} else if(this.state.sex ==="male"){
			var bmr = 66.5 + (13.8*this.state.weight) + (5.0*this.state.height) - (6.8*this.state.age)
		}else{
			alert("broplz");
		}
		if(this.state.activity === "medium"){
			var caloriesNeeded = Math.round(1.2*bmr)
		}else if (this.state.activity ==="high"){
			var caloriesNeeded = Math.round(1.5*bmr)
		}else{
			var caloriesNeeded = Math.round(bmr)
		}
		var proteinNeeded = Math.round(0.9*this.state.weight)
		var fatNeeded = Math.round(0.3*caloriesNeeded)
		var carbsNeeded = Math.round(0.6*caloriesNeeded)
		this.setState({
			caloriesNeeded: caloriesNeeded,
			carbsNeeded:carbsNeeded,
			fatNeeded:fatNeeded,
			proteinNeeded:proteinNeeded
		});
	}
}

//////////////////////////////////////////////////////////////////////////////////

const NutrientsToAdd = (props) => {
	let calculatedCalories = props.caloriesNeeded - props.calories
	let calculatedProteins = props.proteinNeeded - props.proteins
	let calculatedCarbs = props.carbsNeeded - props.carbs
	let calulatedFat = props.fatNeeded - props.fats
	let calculatedSodium = 2300 - props.sodium
	let calculatedSugars = 40-props.sugars
	let calorieColor = ""
	let proteinColor = ""
	let carbColor = ""
	let fatColor = ""
	let sodiumColor = ""
	let sugarColor = ""

	if(calculatedCalories >= 0){
		calorieColor += "positive"
	} else {
		calorieColor += "negative"
	};

	if(calculatedProteins >= 0){
		proteinColor += "positive"
	} else {
		proteinColor += "negative"
	};

	if(calculatedCarbs >= 0){
		carbColor += "positive"
	} else {
		carbColor += "negative"
	};

	if(calulatedFat >= 0){
		fatColor += "positive"
	} else {
		fatColor += "negative"
	};

	if(calculatedSodium >= 0){
		sodiumColor += "positive"
	} else {
		sodiumColor += "negative"
	};

	if(calculatedSugars >= 0){
		sugarColor += "positive"
	} else {
		sugarColor += "negative"
	};

	return(
		<div>
			<div>
				<h3>Your recommended daily intake:</h3>
				<p>{`Calories: ${props.caloriesNeeded} kcal`} | {`Proteins: ${props.proteinNeeded} g`}</p>
				<p>{`Carbs: ${props.carbsNeeded} g`} |  {`Fats: ${props.fatNeeded} g`}</p>
			</div>
			<div className="nutrientsToAdd">
				<h3>Nutrients to add to your diet</h3>
				<p>Calories: <span className={calorieColor}>{`${calculatedCalories || 0}`}</span>kcal | Proteins: <span className={proteinColor}>{`${calculatedProteins || 0}`}</span>g</p>
				<p>Carbs: <span className={carbColor}>{`${calculatedCarbs || 0}`}</span>g | Fats: <span className={fatColor}>{`${calulatedFat || 0}`}</span>g</p>
				<p>Sodium: <span className={sodiumColor}>{`${calculatedSodium || 0}`}</span>mg | Sugars: <span className={sugarColor}>{`${calculatedSugars || 0}`}</span>g</p>
			</div>
		</div>
	)
}

const Resources = () => {
	return(
		<div className="resourcesPage">
				<div className="sideBar">
					<p><Link to="/resources"><i className="fa fa-book" aria-hidden="true"></i></Link></p>
					<p><a href="https://twitter.com/intent/tweet?text=Plan%20your%20fast%20food%20meals%20with%20health%20in%20mind!%20http://codedbyjessica.com/fastfooddiet%20developed%20by%20@codedbyjessica" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></p>
				</div>
				<aside className="resourcesContent">
					<h1>Resources</h1>
					<div className="resources">
						<p><a href="https://www.k-state.edu/paccats/Contents/Nutrition/PDF/Needs.pdf">https://www.k-state.edu/paccats/Contents/Nutrition/PDF/Needs.pdf</a></p>
						<p><a href="https://authoritynutrition.com/how-much-sugar-per-day/">https://authoritynutrition.com/how-much-sugar-per-day/</a></p>
						<p><a href="http://www.hc-sc.gc.ca/fn-an/nutrition/sodium/index-eng.php">http://www.hc-sc.gc.ca/fn-an/nutrition/sodium/index-eng.php/</a></p>
					</div>
				</aside>
			</div> 
	)
}

const Footer = () => {
	return(
					<footer>
						<p><Link to="/resources"><i className="fa fa-book" aria-hidden="true"></i></Link></p>
						<p><a href="https://twitter.com/intent/tweet?text=Plan%20your%20fast%20food%20meals%20with%20health%20in%20mind!%20http://codedbyjessica.com/fastfooddiet%20developed%20by%20@codedbyjessica" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></p>
						<div>&copy; 2017 <a href="http://codedbyjessica.com/" target="_blank">Coded By Jessica</a> | Powered by <a href="https://www.nutritionix.com/business/api" target="_blank">Nutritionix API</a></div>
						<div><a href="#top">Back To Top</a></div>
					</footer>
	)
}

ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="/user" component={User}/>
		<Route path="/resources" component={Resources}/>
	</Route>
</Router>, document.getElementById('app'));