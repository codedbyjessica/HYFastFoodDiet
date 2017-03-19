import React from "react";
import ReactDOM from "react-dom";
import { ajax } from "jquery";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			foods: [],
			brand:"",
			search:"",
			itemInfo:[],
			myDietItems:[]
		}
		console.log("itemInfo", this.state.itemInfo)
		this.addToDiet = this.addToDiet.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}
	addToDiet(e){
		e.preventDefault();
		const dietState = Array.from(this.state.myDietItems);
		dietState.push(this.state.itemInfo);
		this.setState({
			myDietItems: dietState,
		});
			console.log("dietstate",dietState)
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
					<form className="searchForm" onSubmit={(e) => this.searchFoods(e, this.state.search, this.state.brand)}>
						<div>
							<label>Search Item</label>
							<input type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="mcdonalds" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000053"/>
							<label htmlFor="mcdonalds">McDonalds </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="kfc" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00001e"/>
							<label htmlFor="kfc">KFC </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="burgerking" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000a"/>
							<label htmlFor="burgerking">burger king </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="wendys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000f"/>
							<label htmlFor="wendys" >wendys </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="aw" onChange={this.handleRadioChange} value="51db37b8176fe9790a898af4"/>
							<label htmlFor="aw" >a&w </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="arbys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000023"/>
							<label htmlFor="arbys">arbys </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="tims" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000094"/>
							<label htmlFor="tims">tims </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="dairyqueen" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000027"/>
							<label htmlFor="dairyqueen" >dairy queen </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="fiveguys" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00003f"/>
							<label htmlFor="fiveguys" >five guys </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="tacobell" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000020"/>
							<label htmlFor="tacobell" >taco bell </label>
						</div>
						<div className="foodsBrand">
							<input type="radio" name="brand" id="popeyes" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000029"/>
							<label htmlFor="popeyes" >popeyes</label>
						</div>
						<div>
							<button>Search</button>
						</div>
					</form>
				</header>
				<main>
					<div className="itemsList">
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
					<div className="itemInfoCard">
						<div className="itemInfo">
							<h2>{`Item: ${this.state.itemInfo[1]} from ${this.state.itemInfo[0]}`}</h2>
							<p>{`Calories: ${this.state.itemInfo[2]}kcal`}</p>
							<p>{`sugars: ${this.state.itemInfo[3]}g`}</p>
							<p>{`sodium: ${this.state.itemInfo[4]}mg`}</p>
							<p>{`protein: ${this.state.itemInfo[5]}g`}</p>
						</div>
						<div className="itemAdd">
							<button onClick={this.addToDiet}> Add to my diet</button>
						</div>
					</div>
					<div className="myDiet">
						{this.state.myDietItems.map((myDietItem) => {
							console.log("dis printinn me noms??",myDietItem);
							return(
								<div>
									<h4>{`Item ${myDietItem[1]} from ${myDietItem[0]}`}</h4>
									<p>{`Calories: ${myDietItem[2]}kcal`} | {`Sugars: ${myDietItem[3]}g`}</p>
									<p>{`sodium: ${myDietItem[4]}mg`} | {`protein: ${myDietItem[5]}g`}</p>
									<button>Remove from my diet</button>
								</div>
							)
						})}
					</div>
				</main>
			</div>
		)
	}
	searchFoods(e,search, brand){
		e.preventDefault();
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
			console.log(data);
			this.setState({
				foods: data.hits
			});
			console.log("data", data.hits)
		});
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
					data.nf_protein
				]
			});
			console.log("item", data)
			console.log("iteminfo2", this.state.itemInfo)
		});
	}
}

ReactDOM.render(<App />, document.getElementById("app"));

