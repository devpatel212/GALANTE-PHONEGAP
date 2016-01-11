(function() {
	/* Intro controller */
	angular.module('wapp').controller('IntroController', function($scope, rehttp, $location, ImgCache) {

		$scope.slides = [];

		ImgCache.$promise.then(function() {

		 /* Retrieval of the object that contains the whole main config */
		rehttp.query("get_options").find(function(options) {

			if (!options) return;

			var introPostId = options.intro_page_slider;
			console.log("intro:"+introPostId);

			loading.show();
			/* Intro slider */
			var dataOk=false;
			var data2Ok = false;
			rehttp.query("get_posts_by_meta_query")
			.whereEquals("wapp_type", "intro")
			.whereEquals("wapp_check", "on")
			.limit(1)
			.find(function(data) {

				 rehttp.query("get_posts")
				.whereEquals("post_type", "wapp")
				.whereEquals("meta_key", "wapp_type")
				.whereEquals("meta_value","intro")
			 	.limit(1)
				 .find(function(data2) {

				 	console.log(data2);
				 	console.log(data);

					 	if(data2){
				 			if(data2.posts.length>0){
				 				console.log("voy por data 2");
				 				 dataOk=true;
 								var slides = data2.posts[0].custom_fields.wapp_slider;
							}
					 	}
					 	if(!dataOk){
						 		if(data){

							 		if(data.posts.length>0){
										console.log("voy por data");
										var slides = data.posts[0].custom_fields.wapp_slider;
									}
								}
							}
							items = [];
							ids = [];
							var idRepetido;
							for (var i in slides) {
								 idRepetido = false;
        						 ids[i]=slides[i].image_id;
        						 for(var j in ids){
            						if(slides[i].image != slides[i].image_id){
            						}
						            else{
						                idRepetido=true;
						            }
        						}
       							 if(idRepetido==false){
										var x = {
											caption: slides[i].caption,
											picture: slides[i].image[0],
											description: slides[i].description
										};
										items.push(x);
								}
							}

					 $scope.slides = items;
					 loading.hide();
				 });

			});

		});

	});

		$scope.dismiss = function() {
			console.log("take me out");
			$(".splash").hide();
		}
	});


}());
