<html>
<head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="http://www.chartjs.org/assets/Chart.js"></script>
</head>
<body>
<div>
amount of done stories in each sprint
</div>
<div id="image">
</div>
<canvas id="canvas" height="600" width="800" style="background:#fff"></canvas>
</body>
<script>
    function canvasToImage(canvas, backgroundColor) {
		var context = canvas.getContext("2d");

		//cache height and width        
		var w = canvas.width;
		var h = canvas.height;

		var data;

		if(backgroundColor)
		{
			//get the current ImageData for the canvas.
			data = context.getImageData(0, 0, w, h);

			//store the current globalCompositeOperation
			var compositeOperation = context.globalCompositeOperation;

			//set to draw behind current content
			context.globalCompositeOperation = "destination-over";

			//set background color
			context.fillStyle = backgroundColor;

			//draw background / rect on entire canvas
			context.fillRect(0,0,w,h);
		}

		//get the image data from the canvas
		var imageData = this.canvas.toDataURL("image/png");

		if(backgroundColor)
		{
			//clear the canvas
			context.clearRect (0,0,w,h);

			//restore it with original / cached ImageData
			context.putImageData(data, 0,0);        

			//reset the globalCompositeOperation to what it was
			context.globalCompositeOperation = compositeOperation;
		}

		//return the Base64 encoded data url string
		return imageData;
	}

    function getReleases() {
    	var releasesInfo = [];
    	var queryString = getQueryStringByName("releases").split(",");
    	for(var i=0; i<queryString.length; i++) {
    		releasesInfo.push(getReleaseInfo(queryString[i]));
    	}
    	return releasesInfo;
    }

    function getReleaseInfo(releaseId) {
    	var releaseInfo;
    	$.ajax({
    		url: '/ezScrum/web-service/' + getQueryStringByName('projectName') + '/release-plan/' + releaseId +'/all?username=' + getCookie('username') + '&password=' + getCookie('userpwd'),
    		type: 'GET',
    		dataType: 'json',
    		async: false,
    		success: function(release) {
    			releaseInfo = release;
			},
			error: function(release) {
				alert('fail');
            }
    	});
    	return releaseInfo;
    }

    function getCookie(cname) {
    	var name = cname + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0; i<ca.length; i++) {
    		var c = ca[i].trim();
    		if (c.indexOf(name)===0) return c.substring(name.length,c.length-1).replace('"', '');
    	}
    	return "";
    }

    function getQueryStringByName(name) {
    	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    	if(result == null || result.length < 1) {
    		return "";
    	}
    	return result[1];
    }

	function initChart() {
		var releases = getReleases();
		var totalStoryCount = 0;
		var sprintCount = 0;
		var sprintList = [];
        var closedStoryCount = 0;
		for (var i = 0; i < releases.length; i++) {
			for (var j = 0; j < releases[i].sprints.length; j++) {
				sprintCount += 1;
				var sprint = releases[i].sprints[j];
                closedStoryCount = 0;
                
				for (var k = 0; k < releases[i].sprints[j].stories.length; k++) {
					var story = releases[i].sprints[j].stories[k];
					if(story.status === "closed"){
						closedStoryCount++;
					}
					totalStoryCount += 1;
				}
				sprintList.push({
					serial_id : sprint.serial_id,
					closedStoryCount : closedStoryCount
				});
			}
		}

		//var ideal = totalStoryCount - (totalStoryCount / sprintCount);
		var sprints = sprintList;
		var ideal = [];
		var descendStorycounts = [];
        var closedStorycount = 0;
		var labelname = [];
		var max = 0;
		
		// set preset of the dataset
		ideal[0] = totalStoryCount;
		descendStorycounts[0] = totalStoryCount;
		labelname[0] = "";
                   
		// get storycount of sprint
		for (var i = 0; i < sprints.length; i++) {
			closedStorycount += sprints[i].closedStoryCount;
			ideal[i+1] = ideal[i] - totalStoryCount / sprints.length;
            descendStorycounts[i+1] = totalStoryCount - closedStorycount;
            labelname[i+1] = 'sprint' + sprints[i].serial_id;
            if (totalStoryCount > max) {
            	max = totalStoryCount;
            }
		}
		
		var lineChartData = {
				labels : labelname,
				datasets : [
					{ // ideal line
						fillColor : "rgba(255,255,255,0.0)",
						strokeColor : "rgba(52, 152, 219,1)",
						pointColor : "rgba(52, 152, 219,1)",
						data : ideal
					},
					{ // real line
						fillColor : "rgba(255,255,255,0.0)",
						strokeColor : "rgba(231, 76, 60,1)",
						pointColor : "rgba(231, 76, 60,1)",
						data : descendStorycounts
					}
				]
			};
		var width = 0;
		if (max <= 24) {
			width = 2;
		} else {
			width = 5;
		}
		var options = {
			scaleGridLineColor : "rgba(0,0,0,.15)",
			scaleOverride : true,
			scaleSteps : Math.ceil(max/ width),
			scaleStepWidth : width,
			scaleStartValue : 0,
			bezierCurve : false,
			onAnimationComplete : function() {
				$('#image').empty();
				$('#image').html('<img src="' + canvasToImage(document.getElementById("canvas"), "#FFF") + '"/>');
				$('#canvas').hide();
			}
		};

		var storycountChart = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, options);
	}

	$(document).ready(function() {
		initChart();
	});
</script>
</html>
