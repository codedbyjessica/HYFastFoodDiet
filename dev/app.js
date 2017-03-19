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
			search:""
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
					<div class="foodsBrand">
						<label>McDonalds </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000053"/>
					</div>
					<div class="foodsBrand">
						<label>KFC </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00001e"/>
					</div>
					<div class="foodsBrand">
						<label>burger king </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000a"/>
					</div>
					<div class="foodsBrand">
						<label>wendys </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00000f"/>
					</div>
					<div class="foodsBrand">
						<label>a&w </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="51db37b8176fe9790a898af4"/>
					</div>
					<div class="foodsBrand">
						<label>arbys </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000023"/>
					</div>
					<div class="foodsBrand">
						<label>tims </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000094"/>
					</div>
					<div class="foodsBrand">
						<label>dairy queen </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000027"/>
					</div>
					<div class="foodsBrand">
						<label>five guys </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c00003f"/>
					</div>
					<div class="foodsBrand">
						<label>taco bell </label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000020"/>
					</div>
					<div class="foodsBrand">
						<label>popeyes</label>
						<input type="radio" name="brand" onChange={this.handleRadioChange} value="513fbc1283aa2dc80c000029"/>
					</div>
					<button>Search</button>
				</form>
				<FoodItems foods={this.state.foods}/>
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
			// console.log("data.hits", data.hits)
			// console.log("data.hits.fields.item_name", data.hits[0].fields.item_name)
		});
	}
}

const FoodItems = (props) => {
	return(
		<div className="foodItemsList">
			{props.foods.map((food) => {
				return(
				<div key={food._id} className="foodItemsList__food">
					<p>{`${food.fields.item_name}`}</p>
				</div>
				)
			})}
		</div>
	)
	console.log("FoodItems", FoodItems);
}

ReactDOM.render(<App />, document.getElementById("app"));
