(function() {
    angular.module('wapp').controller('CategoryPostsController', ['$scope', 'rehttp', '$filter', 'CategoriesData', '$http', '$q','$rootScope', CategoryPostsController]);

	function CategoryPostsController($scope, rehttp, $filter, CategoriesData, $http, $q,$rootScope) {

		var loadFromCache = true;
		var POSTS_PER_PAGE = 10;
		var PostsDelegateFactory = function(totalPages, totalPosts) {
            controlClicksOnItem = 0;
			return {
				totalPages: totalPages,
				totalPosts: totalPosts,
				configureItemScope : function(index, itemScope) {
					if (!itemScope.item) {

						itemScope.item = {
							posts: [],
							rand: Math.random(),
							loading: true
						};
						itemScope.canceler = $q.defer();


						rehttp.query('get_category_posts')
							.whereEquals('id', CategoriesData.selectedItem.id)
							.limit(POSTS_PER_PAGE).page(index+1)
							.cacheMode(true,true,true)
							.onTimeout(itemScope.canceler.promise)
							.find(function(data, status, headers, config) {
								//$scope.title = CategoriesData.selectedItem.title;
								if (data) {

                                    console.log(data);

									itemScope.item.posts = _.map(data.posts, function(p) {
										p.date_formated = getFormatedDate(p.date_wapp);
										console.log(p);
									p.img ="";

									if(p.custom_fields.youtube_url !=null){
										p.isVideo=true;

									    if(p.thumbnail===undefined){
									    	p.img = json.data.items[0].snippet.thumbnails.medium.url;
									    }
									    else{
									    	p.img = p.thumbnail_images.wapp_horizontal_small.url;
									    }
									}
									else{
										p.isVideo=false;
                                     if(p.thumbnail===undefined){
                                        //set default picture
                                     }
                                    else{//get feature image
                                        p.img = p.thumbnail_images.wapp_horizontal_small.url;
                                    }
                                }
							return p;
							});
						}
					});
					itemScope.item.loading = false;
				}
				},
				calculateItemHeight : function(index) {
					if (index===undefined) return 95 * POSTS_PER_PAGE;
					var h = 95 * (index==(this.totalPages-1)? (this.totalPosts%POSTS_PER_PAGE) : POSTS_PER_PAGE);
					return h;
				},
				countItems : function() {
					return this.totalPages;
				},
				destroyItemScope: function(index, itemScope) {
					itemScope.canceler.resolve();
				},
				setPagesAndPosts : function(numPages, numPosts) {
						this.totalPages = numPages;
						this.totalPosts = numPosts;
				}
			};
		};

		/* At the start, there are no posts. */
		$scope.PostsDelegate = PostsDelegateFactory(1, POSTS_PER_PAGE);

        $scope.loadData = function (refresh, $done) {

		    if (!refresh) loading.show();
			rehttp.query('get_category_posts')
			.whereEquals('id', CategoriesData.selectedItem.id)
			.limit(POSTS_PER_PAGE).page(1)
			.cacheMode(!refresh,true,!refresh)
			.find(function(data, status, headers, config) {
                console.log(data);
				if (!refresh) loading.hide();

				$scope.msg = "";
				$scope.title = CategoriesData.selectedItem.title;
				if (data) {
					console.log("pages:" + data.pages + ", posts:"+data.category.post_count);
					//$scope.PostsDelegate = PostsDelegateFactory(data.pages, data.category.post_count);
					$scope.PostsDelegate.setPagesAndPosts(data.pages, data.category.post_count);
				}
				loadFromCache = false;

				if ($done) {
                    $done();
                    appNavigator.popPage();
                    appNavigator.pushPage('category-posts.html', {animation: 'fade'});

				}
                 block_count=0;
			});
        }

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $scope.msg = "Loading...";
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }


        $scope.title="";
        $scope.loadData(false, undefined);





        $scope.showSearchDetail = function(postid) {

         /* appNavigator.on('prepush', function(event) {
                if($rootScope.isPushing) {
                    event.cancel();
                }
                $rootScope.isPushing = true;
            });

              appNavigator.on('postpush', function(event) {
                 $rootScope.isPushing = false;
            });*/

            block_count++;
            if(block_count==1)
                appNavigator.pushPage('category-post.html', {id:postid, animation:'slide'});
        }

    };

}());
