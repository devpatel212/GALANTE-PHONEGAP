
function getYoutubeId(url){
    //Regex for get the id from youtube
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    var id = url.match(rx);
    if(id!=null){
        if(id[1]!=null){
            return id[1];
        }
    }
    else{
        return "";
    }
}

function getFormatedDate(originalDate){
 var d = new Date(originalDate*1000);
 var formated_date = d.toLocaleDateString();

 return formated_date;
}

function getInterstitialMob(clicksNeeded){
  console.log(clicksNeeded);
  console.log(interstitial_count);
    if(interstitial_count==clicksNeeded){
      interstitial_count=0;
      return true;
    }
    else{
      return false;
    }
}

function checkForBlockPosts(data,$http){
//Check if contains a url video
        var p = data.posts;
        console.log(p);
        for (var i in p) {
            data.posts[i].img = "";
            if(data.posts[i].custom_fields.youtube_url!=null){
                data.posts[i].isVideo = true;
                data.posts[i].img=data.posts[i].thumbnail_images.wapp_horizontal_medium.url;
            }
            else{
                data.posts[i].isVideo = false;
                 if(data.posts[i].thumbnail===undefined){
                    //set default picture
                 }
                else{//get feature image
                    //data.posts[i].thumbnail_images.wapp_horizontal_medium.url=data.posts[i].wapp_horizontal_medium.url;
                    data.posts[i].img=data.posts[i].thumbnail_images.wapp_horizontal_medium.url;
                }
            }
        }
         return data.posts;
}

function checkForFullWidthPosts(data,$http){
        var p = data.posts;
        for (var j in p) {
                 data.posts[j].img = "";
                if(data.posts[j].custom_fields.youtube_url!=null){
                     data.posts[j].isVideo = true;
                     data.posts[j].img = data.posts[j].thumbnail_images.wapp_horizontal_large.url;
                }
                else{
                    if(data.posts[j].thumbnail===undefined){
                        //set default picture
                     }
                    else{//get feature image
                        data.posts[j].img = data.posts[j].thumbnail_images.wapp_horizontal_large.url;
                    }
                }
        }
        return data.posts;
}

function checkForCategoryPosts(data,$http){
        var p = data.posts;
        for (var j in p) {
                 data.posts[j].isVideo = false;
                 data.posts[j].img = "";
                if(data.posts[j].custom_fields.youtube_url!=null){
                      data.posts[j].img = data.posts[j].thumbnail_images.wapp_horizontal_large.url;
                      data.posts[j].isVideo = true;
                }
                else{
                    if(data.posts[j].thumbnail===undefined){
                        //set default picture
                     }
                    else{//get feature image
                        data.posts[j].img = data.posts[j].thumbnail_images.wapp_horizontal_large.url;
                    }
                }
        }
        return data.posts;
}

function checkForSlides(slides,$http){

    var ids = [];
    var idRepetido = false;
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
                description: slides[i].description,
                hasPermalink: slides[i].isPermalink,
                permalink: slides[i].permalink,
                isVideo: false,
                urlVideo: ""
            };
            items.push(x);
        }
    }
        for (var s in items){
            if(slides[s].youtube_slider != null){
                var checkId = slides[s].youtube_slider;
                //Could be empty
                if(checkId.length>5){
                       items[s].isVideo=true;
                       items[s].urlVideo = slides[s].youtube_slider;
                }
            }
            else{
                items[s].isVideo=false;
            }
    }
        return items;
    }



/** Universal piece of code for playing youtube videos */
function launchYoutubePlayer(videoUrl) {
  var ref = window.open(videoUrl, '_system');
}

function checkForIntro(rehttp){
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
          console.log(data.posts);
          console.log(data2.posts);

           if(data.posts.length>0){
            introscreen.show();
         }
         if(data2.posts.length>0){
            introscreen.show();
         }

        });
    });
}

function checkForAdmobBanner(alwaysBanner,banner_id){
  //Show ADMOb
      if(alwaysBanner){
        if(AdMob) AdMob.createBanner( {
            adId: banner_id,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            overlap:true,
            autoShow: true
        } );
      }
      else{
         if(AdMob){
            AdMob.hideBanner();
         }
      }
}

function checkForAdmobInterstitial(showInterstitial,interstitial_id){
  //Show ADMOb
      if(showInterstitial){
        if(AdMob) AdMob.prepareInterstitial( {adId:interstitial_id, autoShow:false} );
    }
}
