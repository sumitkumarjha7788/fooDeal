
// properly angular ka swagat karna
// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);

//configure route of the specific link or botton and pages
foodieApp.config(function ($routeProvider) {
	$routeProvider
	//for backslash when back feom the home page
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
			//link route the home (for nav button)
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
		//link route the individual restaurant details...!!!!
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})
/// controling the restaurants view detail and position by the angulae using parameter id
foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);
// individual restaurant page details here
var restaurants = [{
					name: 'Taj Mahal',
					address: '38/39, Level 1, Block E , Inner Circle, Central Mumbai',
					location: 'Central ,Mumbai',
					category: 'Coffee , Casual Dining, Bar',
					vote: '4.7',
					cuisines: 'Italian,Indian,Thai',
					cost: '3500',
					id: 1,
					hours:'24x7 Open',
					bestDish: {
								name: ' alomond cake',
								image: 'https://cdn1.healthambition.com/wp-content/uploads/2017/02/28094257/imagee1.jpg'
								},
					image: 'https://s-media-cache-ak0.pinimg.com/736x/0c/a5/09/0ca509cf853bf022fa2fc8db801ac9af--coated-almonds-almonds-roasted.jpg'
				},{
            name: 'cafe cub',
            address: '12/13,phase-2,Connaught Place ',
            location: 'Connaught Place',
            category: 'Coffee,juice',
            vote: '4.2',
            cuisines: 'Indian,spanish,Modern',
            cost: '700',
						id: 2,
						bestDish: {
									name:  'Mango Lassi',
									image: 'https://www.supplybunny.com/uploads/product/main_image/1585/a117243e-b4a3-444f-b793-aad61fb66b05.jpg'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://realfood.tesco.com/media/images/Mango-lassi-syllabub-LGH-005f53f6-0e6a-4ced-919f-0ca3fad28b3b-0-1400x919.jpg'
          },
          {
                name: 'Chilli Hills',
                address: 'Mall Road,Shimla',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.8',
                cuisines: 'traditional/Modern Indian',
                cost: '1500',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
								bestDish: {
											name: 'cheesey brown rice',
											image: 'https://www.chowstatic.com/assets/recipe_photos/29186_basic_brown_rice.jpg'
										},
								image: 'https://www.chowstatic.com/assets/recipe_photos/29186_basic_brown_rice.jpg'
              },
							{
													name: 'Kitchen house',
													address: 'City Center,Ambala',
													location: 'Ambala City',
													category: 'Casual Dining, Bar',
													vote: '3.9',
													cuisines: 'Regional Indian',
													cost: '2200',
													id: 4,
													hours: '11 AM to 1 AM (Mon-Sun)',
													bestDish: {
																name: 'moca salad',
																image: 'http://jetspizza.com/dbphotos/display/c161462910486f60cf38484ecf458adf/664/410'
															},
													image: 'http://jetspizza.com/dbphotos/display/c161462910486f60cf38484ecf458adf/664/410'
												},
              {
                    name: 'KFC',
                    address: 'CHANDIGARH',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining,',
                    vote: '4.3',
                    cuisines: 'Spanish, Italian , Indian',
                    cost: '1600',
										id: 5,
                    hours: '1 AM to 1 PM (Mon-Sun)',
										bestDish: {
													name: 'Corn Pizza',
													image: 'http://static3.uk.businessinsider.com/image/589dcbd9dffcc224008b4d7d-960/kfc-chizza.jpg'
												},
										image: 'http://static3.uk.businessinsider.com/image/589dcbd9dffcc224008b4d7d-960/kfc-chizza.jpg'
									},
									{
															name: 'Beer Cafe',
															address: 'ocean tides, Dona Paula Beach',
															location: 'GOA',
															category: 'Bar',
															vote: '4.0',
															cuisines: 'Beverages',
															cost: '400',
															id: 6,
															hours: '12 Noon to 1 AM (Mon-Sun)',
															bestDish: {
																		name: 'chilled ale',
																		image: 'https://etimg.etb2bimg.com/photo/47495956.cms'
																	},
															image: 'https://etimg.etb2bimg.com/photo/47495956.cms'
														},
								]

// use of the clarifai  API for getting ingredientsof the recommended dish
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
/// to check which nutrienti s present in the food in large amount or if the nutrients are present or not and tells about it automatically
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
													$(".highlight-info").css("margin-top" ,"20px");
													break;
												 }

									 else if($scope.ingredients.indexOf(fat[i]) > -1){
										 	var info2 = "<p class='highlight-info'>Fat Rich</p>";
												console.log('fat rich');
												$(".type .bestDish").append(info2);
												$(".highlight-info").css("background-color" ,"yellow");
												$(".highlight-info").css("color" ,"black");
												$(".highlight-info").css("font-size" ,"20px");
												$(".highlight-info").css("margin-top" ,"20px");
												break;
											}

										else if($scope.ingredients.indexOf(carb[i]) > -1){
	 										 	var info3 = "<p class='highlight-info'>Carbohydrate Rich</p>";
	 												console.log('carb rich');
	 												$(".type .bestDish").append(info3);
	 												$(".highlight-info").css("background-color" ,"green");
													$(".highlight-info").css("color" ,"white");
													$(".highlight-info").css("font-size" ,"20px");
													$(".highlight-info").css("margin-top" ,"20px");
	 												break;
	 											}

												else {
													 	var info4 = "<p class='highlight-info'>Not a nutrient rich food</p>";
														$(".type .bestDish").append(info3);
														$(".highlight-info").css("background-color" ,"black");
														$(".highlight-info").css("color" ,"white");
														$(".highlight-info").css("font-size" ,"20px");
														$(".highlight-info").css("margin-top" ,"20px");
												}



										}





										//console.log(ingredients.length);
						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });


}


})
//controlsthe page link ---------if lgin successful goto the homepage of the app

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
//controls the details should show or not
  $scope.restaurants = [{
							name: 'TAJ Mahal',
							address: '38/39, Level 1, Block E , Inner Circle, Central Mumbai',
							location: 'Central Mumbai',
							category: 'Casual Dining, Bar',
							vote: '4.7',
							cuisines: 'Italian,Indian,Thai',
							cost: '3500',
							id: 1,
							hours: '24x7 Open',
							image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2g1D1YxfrLZtiT8g8giRrqSIwhB7eXhA3li8fPtNFx-I-w_E9ioDMcTVA'
						},{
            name: 'Cafe Cub',
            address: '12/13,phase-2,Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.2',
            cuisines: 'Indian,spanish,Modern',
            cost: '700',
						id: 2,
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'http://www.cafemonico.com/system/files/042016/5702a180f7c88b353000073b/full_bleed/Cafe_Monico_XX.jpg?1459790229'
          },
          {
                name: 'Chilli Hills',
                address: 'Mall Road ,Shimla',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.8',
                cuisines: 'Traditional/Modern Indian',
                cost: '1500',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://afktravel.com/wp-content/uploads/2014/01/download-31-259x180.jpg'
              },
							{
													name: 'Kitchen house',
													address: 'City Center,Ambala',
													location: 'Ambala City',
													category: 'Casual Dining, Bar',
													vote: '3.9',
													cuisines: 'Regional Indian',
													cost: '2200',
													id: 4,
													hours: '11 AM to 1 AM (Mon-Sun)',
													image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
												},
              {
                    name: 'KFC',
                    address: 'Civil lines ,Chandigarh',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining',
                    vote: '4.3',
                    cuisines: 'Modern Indian',
                    cost: '800',
										id: 5,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://seeklogo.com/images/K/kfc-logo-E3942BB987-seeklogo.com.png'
									},
										{
																name: 'Beer Cafe',
																address: 'ocean tides, Dona Paula Beach',
																location: 'GOA',
																category: 'Cafe,Bar',
																vote: '4.0',
																cuisines: 'Beverages',
																cost: '400',
																id: 6,
																hours: '12 Noon to 1 AM (Mon-Sun)',
																image: 'https://s3.scoopwhoop.com/anj/jbkjnklsd/1f7067aa-56cd-44ac-aaf8-04b99a830fd0.jpg'
															},
									]
})
