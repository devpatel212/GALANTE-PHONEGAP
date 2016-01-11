(function() {
    angular.module('wapp').controller('ProductController', ['$scope', 'ProductsData', 'rehttp','$http', ProductController]);
	function ProductController($scope, ProductsData, rehttp,$http) {
		var options = appNavigator.getCurrentPage().options;
        var id= "";
        var isVideo = false;
        $scope.item = ProductsData.selectedItem;  //TODO: fallback content

		loading.show();

		rehttp.query("get_post")
		.whereEquals("post_type",options.post_type)
		.whereEquals("id", options.id)
		.find(function(data) {


     console.log(options.post_type);
			         if (data) {

                console.log(data);
                 if(data.post == null){

                 }
                else{
                       if(data.post.custom_fields.youtube_url!=null){
                              id = data.post.custom_fields.youtube_url[0];
                              data.post.img=data.post.thumbnail_images.wapp_horizontal_large.url;
                              data.post.isVideo = true;
                              isVideo=true;
                              $scope.item = data.post;
                      }

                      else{
                              data.post.isVideo = false;
                              isVideo=false;
                          if(data.post.thumbnail===undefined){

                          }
                          else{
                            data.post.img=data.post.thumbnail_images.wapp_horizontal_large.url;
                          }
                    }

                $scope.item = data.post;
                console.log(data.post);
                data.post.date_formated = getFormatedDate(data.post.date_wapp);
                block_count=0;
                loading.hide();
                //Count to show admbob interstitial
                interstitial_count++;
               if(AdMob && showInterstitial){
                  if(getInterstitialMob(clicksNeeded)){
                      AdMob.showInterstitial();
                   }
               }

            }
          }




    });



        $scope.sharePost = function () {
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;
			      var image = $scope.item.thumbnail;

            window.plugins.socialsharing.share(subject, subject, image, link);
        };


        /* Method for play a video from youtube */
        $scope.playVideo = function() {
            if(isVideo){
              console.log(id);
              launchYoutubePlayer(id);
            }
        };

     };
}());

