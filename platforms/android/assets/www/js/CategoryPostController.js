(function() {
    angular.module('wapp').controller('CategoryPostController', ['$scope', 'CategoriesData', '$sce', 'rehttp', '$http', CategoryPostController]);

	function CategoryPostController($scope, CategoriesData, $sce, rehttp, $http) {

		var options = appNavigator.getCurrentPage().options;

		$scope.loading = true;
		$scope.item = {
			title: "",
			date_formated: "",
			author: {name: ""},
			content: "",
			attachments: [],
			isVideo: false,
			videoId: "",
			thumbnail_images: {wapp_horizontal_large: {url:""}}
		};
		$scope.comments = [];

		loading.show();
		//Check for dont open more than one view (see categoryPostsController)
		controlClicksOnItem = 0;
		console.log(controlClicksOnItem);


		rehttp.query("get_post").whereEquals("id",options.id).find(function(data) {



			if (data && data.post) {

				$scope.item = data.post;
				$scope.item.date_formated = getFormatedDate(data.post.date_wapp);
				console.log(data.post);
				$scope.item.img = "";

				if(data.post.custom_fields.youtube_url !=null){
					$scope.item.isVideo=true;
					$scope.item.img = data.post.thumbnail_images.wapp_horizontal_large.url;
					$scope.item.videoId =data.post.custom_fields.youtube_url[0];
				}
				else{
					$scope.item.isVideo=false;
					if($scope.item.thumbnail == undefined){
						//set default image
					}
					else{
						$scope.item.img = data.post.thumbnail_images.wapp_horizontal_large.url;
					}
				}



				$scope.loading = false;
				block_count=0;
				loading.hide();
				$scope.content = $sce.trustAsHtml($scope.item.content);

				var treeify = function(l, rootid) {

					var r = _.filter(l, function(x) { return x.parent==rootid });
					if (r.length > 0) {
						return _.map(r, function(x) {
							x.comments = treeify(l, x.id);
							return x;
						});
					} else {
						return r;
					}
				}

				$scope.item.comments = treeify($scope.item.comments, 0);

				$scope.sharePost = function () {

					var subject = $scope.item.title;
					var message = $scope.item.content;
					message = null; //message.replace(/(<([^>]+)>)/ig,"");

					var image = $scope.item.thumbnail;
					var link = $scope.item.url;

					//Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
					window.plugins.socialsharing.share(subject, subject, image, link);

				}
			}

		});

		$scope.loadURL = function (url) {
			//target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
			//_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
			//_blank: Opens in the InAppBrowser.
			//_system: Opens in the system's web browser.
			window.open(url,'_blank');
     	};

     			 /* Method for play a video from youtube */
        $scope.playVideo = function() {
            if($scope.item.isVideo){
            	console.log("play video");
            	launchYoutubePlayer($scope.item.videoId);
            }
            else{
            	console.log("no play video");
            }
        };

     };
}());
