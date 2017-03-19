import React from "react";
import ReactDOM from "react-dom";
import { ajax, when } from "jquery";

//show restaurant, type of food, choices

const search="big mac";
const brandId="513fbc1283aa2dc80c000053"

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
}

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			foods: []
		}
	}
	render() {
		console.log("rendering");
		return(
			<div>
				<form className="searchForm">
					<label>Search Item</label>
					<input type="text" name="item" />
					<label>McDonalds </label>
					<input type="radio" name="name" id="513fbc1283aa2dc80c000053"/>
					<button>Search</button>
				</form>
				<h2>{`You searched for ${search}`}</h2>
				<FoodItems foods={this.state.foods}/>
			</div>
		)
	}
	componentDidMount(){
		const foodsOne = ajax({
			url: `https://api.nutritionix.com/v1_1/search/${search}?`,
			// url: `https://api.nutritionix.com/v1_1/search/`,
			data: {
				appId: `f109a1ae`,
				appKey: `1509d9d17bf6d351eac532db57502e5e`,
				results:`0:50`,
				fields:`*`,
				brand_id: brandId
			},
			method: "GET",
			dataType: "json"
		})
		const foodsTwo = ajax({
			url: `https://api.nutritionix.com/v1_1/search/${search}?`,
			// url: `https://api.nutritionix.com/v1_1/search/`,
			data: {
				appId: `f109a1ae`,
				appKey: `1509d9d17bf6d351eac532db57502e5e`,
				results:`51:100`,
				fields:`*`,
				brand_id: brandId
			},
			method: "GET",
			dataType: "json"
		})
		const foodsThree = ajax({
			url: `https://api.nutritionix.com/v1_1/search/${search}?`,
			// url: `https://api.nutritionix.com/v1_1/search/`,
			data: {
				appId: `f109a1ae`,
				appKey: `1509d9d17bf6d351eac532db57502e5e`,
				results:`101:150`,
				fields:`*`,
				brand_id: brandId
			},
			method: "GET",
			dataType: "json"
		})
		when(foodsOne, foodsTwo, foodsThree)
		.then((dataOne, dataTwo, dataThree) => {
			const foodItemOne = dataOne[0].hits;
			const foodItemTwo = dataTwo[0].hits;
			const foodItemThree=dataThree[0].hits;
			console.log("fooditemone", foodItemOne);
			const foodsAll = foodItemOne.concat(foodItemTwo,foodItemThree)
			console.log("foodItemOne",foodItemOne);
			console.log("foodItemTwo",foodItemTwo);
			console.log("foodItemThree", foodItemThree);
			console.log("foodsall",foodsAll);
			console.log("foodsall that specific name",foodsAll[0].fields.item_name);
			// this.setState({
			// 	foods:data.hits
			})
			// console.log("data", data)
			// console.log("data.hits", data.hits)
			// console.log("data.hits[0].fields.itme_name", data.hits[0].fields.item_name)
		}
}



ReactDOM.render(<App />, document.getElementById("app"));
