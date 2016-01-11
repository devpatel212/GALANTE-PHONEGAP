(function() {

    angular.module('wapp').controller('HomeController', ['$scope', 'rehttp', '$sce','$localStorage','$http', function($scope, rehttp, $sce, $localStorage, $http) {

		 $scope.videoUrl = "";

		 $scope.clickedOnSlide = function(index) {
		 	 console.log("clickedOnSlide: " + index);
			 var slide = $scope.slides[index];
			 console.log(slide);
			 if (slide.hasPermalink) {
			 	block_count++;
           		if(block_count==1)
             		appNavigator.pushPage('page.html', {pageid: slide.permalink});
		 	}

			 /*
			 if (slide.hasPermalink) {
				 window.open(slide.permalink, '_system');
			 }
			 */
		 };

		 /* Method for play a video from youtube */
        $scope.playVideo = function(index) {
            var slide = $scope.slides[index];
            if(slide.isVideo){
				launchYoutubePlayer(slide.urlVideo);
            }
        };

		 $scope.load = function($done) {
		 		loading.show();
			 /* Retrieval of the object that contains the whole main config */
			 rehttp.query("get_options").find(function(options) {

				 if (!options) return;

				 if(options.wapp_config_display_intro == 'yes'){
				 		if(options.wapp_config_display_repeat_intro == 'yes'){
				 			checkForIntro(rehttp);
				 		}
				 		else{
				 			if(localStorage.getItem("intro")==null){
				 				checkForIntro(rehttp);
				 			}
				 		}
				 	 localStorage.setItem("intro", "1");
				 }


				 //Check configurations ADMOB
				 alwaysBanner = (options.wapp_admob_banner_always == 'yes');
				 checkForAdmobBanner(alwaysBanner,options.banner_id);

				 showInterstitial= (options.wapp_admob_interstitial_post == 'yes');
 				 checkForAdmobInterstitial(showInterstitial,options.interstitial_id);
				 clicksNeeded =  options.wapp_admob_interstitial_clicks;




				 var sliderPostId = options.home_page_slider;
				 var t1PostId = options.home_page_type_one;
				 var t2PostId = options.home_page_type_two;
				 var t3PostId = options.home_page_type_three;

				 var dataOk=false;
				 /* Block home slider */
				 if(options.wapp_config_display_slider == 'yes'){
					rehttp.query("get_posts_by_meta_query")
						.whereEquals("wapp_type", "slider")
						.whereEquals("wapp_check", "on")
					 .limit(1)
					 .find(function(data) {

						 rehttp.query("get_posts")
						.whereEquals("post_type", "wapp")
						.whereEquals("meta_key", "wapp_type")
						.whereEquals("meta_value","slider")
					 	.limit(1)
						 .find(function(data2) {
					 		if(data2){
					 			if(data2.posts.length>0){
					 				 dataOk=true;
									 var slides = data2.posts[0].custom_fields.wapp_slider;
									 items = [];
									 $scope.slides = checkForSlides(slides,$http);
					 			}
						 	}
						 	if(!dataOk){
						 		if(data){
							 		if(data.posts.length>0){
							 			var slides = data.posts[0].custom_fields.wapp_slider;
										items = [];
										$scope.slides = checkForSlides(slides,$http);
							 		}
							 	}
							}

				 });

			 });

		 }






				 /* Block Posts Columns */ // YOUTUBE THUMBNAIL OK
				 if(options.wapp_config_display_columns == 'yes'){
						rehttp.query("get_posts_by_meta_query")
							.whereEquals("wapp_type", "option1")
							.whereEquals("wapp_check", "on")
							.limit(options.wapp_config_column_posts)
						 .find(function(data) {

							 $scope.letterLimit = 100;
							 //Check for normal post
							 if (data) {
								$scope.products = _.map(data.posts, function(p) {
									 p.date_formated = getFormatedDate(p.date_wapp);
									 return p;
								 });
								var products_block_posttype = checkForBlockPosts(data,$http);
						 	}
						 	//Check for wapp posts
						  rehttp.query("get_posts")
										.whereEquals("post_type", "wapp")
										.whereEquals("meta_key", "wapp_type")
										.whereEquals("meta_value","option1")
									 .limit(options.wapp_config_column_posts)
									 .find(function(data2) {
										if (data2) {
											$scope.products = _.map(data2.posts, function(p) {
												 p.date_formated = getFormatedDate(p.date_wapp);
												 return p;
											 });
											var products_block_wapptype = checkForBlockPosts(data2,$http);
											$scope.products = products_block_posttype.concat(products_block_wapptype);
									 	}
									 });
				 });
			 }

				 /* Block Full width posts */
				 if(options.wapp_config_display_full == 'yes'){
					rehttp.query("get_posts_by_meta_query")
						 .whereEquals("wapp_type", "option2")
						 .whereEquals("wapp_check", "on")
						 .limit(options.wapp_config_full_posts)
						 .find(function(data) {
							 $scope.letterLimit = 100;
							 if (data) {
								 	//Check if contains a url video
									 $scope.posts = _.map(data.posts, function(p) {
										 p.date_formated = getFormatedDate(p.date_wapp);
										 return p;
									 });
									 var products = checkForFullWidthPosts(data,$http);
									 console.log(products);
							 }
							//Check for wapp posts
							  rehttp.query("get_posts")
									.whereEquals("post_type", "wapp")
									.whereEquals("meta_key", "wapp_type")
									.whereEquals("meta_value","option2")
									 .limit(options.wapp_config_full_posts)
									 .find(function(data2) {
									 	if (data2) {
											$scope.posts = _.map(data2.posts, function(p) {
												 p.date_formated = getFormatedDate(p.date_wapp);
												 return p;
											 });
											var products2 = checkForFullWidthPosts(data2,$http);
											console.log(products2);
											$scope.posts = products.concat(products2);
									 	}
									 });
							 });
				 }

				 var cat1;
				 var cat2;
				 /* Block posts list */
				 if(options.wapp_config_display_list == 'yes'){
					  rehttp.query("get_posts_by_meta_query")
						.whereEquals("wapp_type", "option3")
						.whereEquals("wapp_check", "on")
					 .limit(options.wapp_config_list_posts)
					 .find(function(data) {
						 $scope.letterLimit = 100;

 						 rehttp.query("get_posts")
							.whereEquals("post_type", "wapp")
							.whereEquals("meta_key", "wapp_type")
							.whereEquals("meta_value","option3")
						 	.limit(options.wapp_config_list_posts)
						 	.find(function(data2) {
							 	 if (data2) {
									 $scope.categories = _.map(data2.posts, function(p) {
										 p.date_formated = getFormatedDate(p.date_wapp);
										 return p;
									 });
								 	cat2 = data2.posts;
									console.log(data2);
								}
								 if (data) {
									 $scope.categories = _.map(data.posts, function(p) {
										 p.date_formated = getFormatedDate(p.date_wapp);
										 return p;
									 });
									 cat1 = data.posts;
								 }
								 if(data && data2){
								 	 cat1 = checkForCategoryPosts(data,$http);
									 cat2 = checkForCategoryPosts(data2,$http);
									  $scope.categories=cat1.concat(cat2);
								 }
								 else if(data){
								 	cat1 = checkForCategoryPosts(data,$http);
								 	$scope.categories=cat1;
								 }
								 else if(data2){
									cat2 = checkForCategoryPosts(data2,$http);
								 	$scope.categories=cat2;
								 }
							});
					 });
				 }

			 });
		}
		loading.hide();
		$scope.load();


		/* Method for showing an item in its own page. */
		$scope.showDetail = function(postid, posttype) {
			 block_count++;
           	 if(block_count==1)
				 appNavigator.pushPage('product.html', {post_type: posttype, id: postid, animation: 'slide'});
			}


    }]);


}());