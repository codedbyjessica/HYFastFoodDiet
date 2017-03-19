import React from "react";
import ReactDOM from "react-dom";
import { ajax } from "jquery";

// const search="cheeseburger";
// const brandId="513fbc1283aa2dc80c000053"

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			foods: [],
			brand:"",
			search:"",
			calories:""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value)
	}
	handleRadioChange(e){
		console.log(e.target);
		this.setState({
			brand: e.target.value
		});
	}
	render() {
		return(
			<div>
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
					<button>Search</button>
				</form>
				<div className="foodItemsList">
					{this.state.foods.map((food) => {
					return(
						<div key={food._id} className="foodItemsList__food">
							<p onClick={(e) => this.searchItem(e, food.fields.item_id)}>{`${food.fields.item_name} ${food.fields.item_id}`}</p>
						</div>
					)
					})}
				</div>
				<ItemDetails data={this.state.calories}/>
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
		.then((item) => {
			this.setState({
				calories:[item.nf_calories]
			});
			console.log("item", item)
			console.log("item calories", item.nf_calories, "kcal")
		});
	}
}

class ItemDetails extends React.Component{
	render(){
		return(
			<div>
				<p>{`Calories: ${this.props.data}kcal`}</p>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
