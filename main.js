
// properly angular ka swagat karna
// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);

//configure kar rahe hain
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);
var restaurants = [{
					name: 'Taj',
					address: '38/39, Level 1, Block E , Inner Circle, Central Mumbai',
					location: 'Central ,Mumbai',
					category: 'Coffee , Casual Dining, Bar',
					vote: '4.6',
					cuisines: 'Indian',
					cost: '2800',
					id: 1,
					hours: '12 Noon to 1 AM (Mon-Sun)',
					bestDish: {
								name: '',
								image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAJpcmkdmiJDPzfvRBX45Qb8HanX86YgxOepeNxR88sLP1PLmr'
							},
					image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
				},{
            name: 'CCD',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						bestDish: {
									name: 'Corn Pizza',
									image: 'http://kottke.org/plus/misc/images/egg-ruhlman.jpg'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
          },
          {
                name: 'Sagar Ratna',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Modern Indian',
                cost: '1200',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
								bestDish: {
											name: 'Corn Pizza',
											image: 'http://kottke.org/plus/misc/images/egg-ruhlman.jpg'
										},
								image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
              },
              {
                    name: 'KFC',
                    address: 'CHANDIGARH',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining,',
                    vote: '4.3',
                    cuisines: 'Spanish, Italian , Indian',
                    cost: '1600',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
										bestDish: {
													name: 'Corn Pizza',
													image: 'http://kottke.org/plus/misc/images/egg-ruhlman.jpg'
												},
										image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
									}]


				$scope.restaurant = restaurants[$routeParams.id - 1];

			$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
					$http({
						'method': 'POST',
						'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
						'headers': {
							'Authorization': 'Key a83cf33d81ca4f71ae7f18345e7b8ab0',
							'Content-Type': 'application/json'
						},
						'data': data,

					}).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
								//console.log(ingredients[0].value);

					  			var list = '';
									var protein = ['egg','chicken','oats','cheese','yogurt','milk','broccoli','tuna','lentil','fish','shrimp'];
									var fat = ['flaxseed','almond','oil','avocado','walnuts','peanut','cashew','dark chocolate'];
									var carb = ['oatmeal','yams','brown rice','pumpkin','apple','oranges','pears','mango']

									for (var i =0;i < ingredients.length;i++) {

										//if($scope.ingredients[i].value > 0.85){
										$scope.ingredients.push(ingredients[i].name);
									    //}
										}

										for(var i=0;i< protein.length;i++){
											// CHECK FOR THE PROTEIN ROR CARB OR FAT RICH FOOD
											//console.log($scope.protein);
										if ($scope.ingredients.indexOf(protein[i]) > -1) {
												var info = "<p class='highlight-info'>Protien Rich</p>";
												console.log("run");
													$(".rest-extra .bestDish").append(info);
													$(".highlight-info").css("background-color" ,"cyan");
													$(".highlight-info").css("color" ,"black");
													$(".highlight-info").css("font-size" ,"20px");
													$(".highlight-info").css("font-size" ,"20px");
													break;
												 }

									 else if($scope.ingredients.indexOf(fat[i]) > -1){
										 	var info2 = "<p class='highlight-info'>Fat Rich</p>";
												console.log('fat rich');
												$(".type .bestDish").append(info2);
												$(".highlight-info").css("background-color" ,"yellow");
												$(".highlight-info").css("color" ,"black");
												$(".highlight-info").css("font-size" ,"20px");
												$(".highlight-info").css("font-size" ,"20px");
												break;
											}

										else if($scope.ingredients.indexOf(carb[i]) > -1){
	 										 	var info3 = "<p class='highlight-info'>Carbohydrate Rich</p>";
	 												console.log('carb rich');
	 												$(".type .bestDish").append(info3);
	 												$(".highlight-info").css("background-color" ,"green");
													$(".highlight-info").css("color" ,"white");
													$(".highlight-info").css("font-size" ,"20px");

	 												break;
	 											}

												else {
													 	var info4 = "<h1 class='highlight-info'>Not a nutrient rich food</h1>";
														$(".type .bestDish").append(info3);
														$(".highlight-info").css("background-color" ,"black");
														$(".highlight-info").css("color" ,"white");
														$(".highlight-info").css("font-size" ,"20px");
														
												}



										}





										//console.log(ingredients.length);
						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });


}


})


foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			$location.url('home')
			console.log($location.url);
		}
})

//controller ka function is used to create a controller
//main controller controller ka naam h
// iss function ke andar aayega jo bhi kaam hoga controller ka
foodieApp.controller('mainController',function($scope) {
  //CONTROLLER KAREGA KYA

  $scope.restaurants = [{
							name: 'Farzi Cafe',
							address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
							location: 'Connaught Place',
							category: 'Casual Dining, Bar',
							vote: '4.2',
							cuisines: 'Modern Indian',
							cost: '2200',
							id: 1,
							hours: '12 Noon to 1 AM (Mon-Sun)',
							image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
						},{
            name: 'CCD',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						id: 2,
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
          },
          {
                name: 'Sagar Ratna',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Modern Indian',
                cost: '1000000',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
              },
              {
                    name: 'AFC',
                    address: 'BUEST',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Modern Indian',
                    cost: '50',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
                    }]
})
