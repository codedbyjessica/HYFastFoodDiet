import React from "react";
import ReactDOM from "react-dom";
import { ajax } from "jquery";
import DietItem from "./dietItem";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			foods: [],
			brand:"",
			search:"",
			itemInfo:["","",0,0,0,0,0,0],
			myDietItems:[],
			totalCount:["","",0,0,0,0,0,0]
		}
		this.addToDiet = this.addToDiet.bind(this);
		this.removeFromDiet = this.removeFromDiet.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}
	addToDiet(e){
		e.preventDefault();
		const dietState = Array.from(this.state.myDietItems);
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
			<div className="container">
				<header>
					<div>
					hello
					</div>
					<div>
						random red section
					</div>
				</header>
				<section>
					<div className="sideBar"> tweet </div>
					<CalculateNutrients />
					<div className="searchFormDiv box">
						<h1> search</h1>
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
				</section>
				<main>
					<div className="sideBar"> <div>&copy;<a href="http://codedbyjessica.com/">CodedByJessica</a></div> </div>
					<div className="itemsList box">
						<div>
							{`Showing results for ${this.state.search}`}
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
					</div>
					<div className="itemInfoCard box">
						<div className="itemInfo">
							<h2>{`${this.state.itemInfo[0]}`}</h2>
							<h3>{`${this.state.itemInfo[1]}`}</h3>
							<p>{`Calories: ${this.state.itemInfo[2]}kcal`}</p>
							<p>{`sugars: ${this.state.itemInfo[3]}g`}</p>
							<p>{`sodium: ${this.state.itemInfo[4]}mg`}</p>
							<p>{`protein: ${this.state.itemInfo[5]}g`}</p>
							<p>{`Carbs: ${this.state.itemInfo[6]}g`}</p>
							<p>{`Fat: ${this.state.itemInfo[7]}g`}</p>
						</div>
						<div className="itemAdd">
							<button onClick={this.addToDiet}> Add to my diet</button>
						</div>
					</div>
					<div className="myDiet box">
						<div>
							<h2>My Diet</h2>
							<h4>Total Count</h4>
							<p>{`Calories: ${this.state.totalCount[2]}kcal`} | {`Sugars: ${this.state.totalCount[3]}g`}</p>
							<p>{`sodium: ${this.state.totalCount[4]}mg`} | {`protein: ${this.state.totalCount[5]}g`}</p>
							<p>{`carbs: ${this.state.totalCount[6]}mg`} | {`fat: ${this.state.totalCount[7]}g`}</p>
						</div>
						<article className="myDietSection">
						{this.state.myDietItems.map((myDietItem, i) => {
							return(
								<div className="myDietItem">
									<h4>{`${myDietItem[1]} from ${myDietItem[0]}`}</h4>
									<p>{`Calories: ${myDietItem[2]}kcal`} | {`Sugars: ${myDietItem[3]}g`}</p>
									<p>{`sodium: ${myDietItem[4]}mg`} | {`protein: ${myDietItem[5]}g`}</p>
									<p>{`carbs: ${myDietItem[6]}mg`} | {`fat: ${myDietItem[7]}g`}</p>
									<DietItem key={i} myDietItem={myDietItem} remove={this.removeFromDiet} dietIndex={i} />
								</div>
							)
						})}
						</article>
					</div>
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
			carbsNeeded:0
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		return(
			<div className="myInfo box">
				<h1>My info</h1>
				<form className="myInfoForm" onSubmit={(e) => this.calculateNeeded(e, this.state.sex, this.state.weight, this.state.height, this.state.age)}>
				<div>
					<input type="radio" name="sex" value="male" id="male" onChange={this.handleChange} /><label htmlFor="male">Male</label>
					<input type="radio" name="sex" value="female" id="female" onChange={this.handleChange} /><label htmlFor="female">Female</label>
					<input type="text" name="age" className="numberInput" placeholder="Age" onChange={this.handleChange} />
				</div>
				<div>
					<input type="text" name="weight" className="numberInput" placeholder="Weight(kg)" onChange={this.handleChange} />
					<input type="text" name="height" className="numberInput" placeholder="Height(cm)" onChange={this.handleChange} />
				</div>
				<div>
					Exercise level:
					<input type="radio" name="activity" value="low" id="low" onChange={this.handleChange} /> <label htmlFor="low">Low</label>
					<input type="radio" name="activity" value="medium" id="medium" onChange={this.handleChange} /> <label htmlFor="medium">Medium</label>
					<input type="radio" name="activity" value="high" id="high" onChange={this.handleChange} /> <label htmlFor="high">High</label>
				</div>
				<div><button>stbmipoo</button></div>
				</form>
				<div>
					<h3>Your recommended daily intake:</h3>
					<span>{`Calories: ${this.state.caloriesNeeded}kcal`}</span>
					<span>{`Proteins: ${this.state.proteinNeeded}g`}</span>
					<span>{`Carbs: ${this.state.carbsNeeded}g`}</span>
					<span>{`Fats: ${this.state.fatNeeded}g`}</span>
				</div>
			</div>
		)
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
		var proteinNeeded = 0.9*this.state.weight
		var fatNeeded = 0.3*caloriesNeeded
		var carbsNeeded = 0.6*caloriesNeeded
		this.setState({
			caloriesNeeded: caloriesNeeded,
			carbsNeeded:carbsNeeded,
			fatNeeded:fatNeeded,
			proteinNeeded:proteinNeeded
		});
	}
}

ReactDOM.render(<App />, document.getElementById("app"));

