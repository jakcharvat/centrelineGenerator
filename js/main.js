var output = "";

function createCentreLine() {
    try {
        /*--- Prepare correct coordinate format ---*/
        var coordOne = document.getElementById("rwyEndOne").value;   
        var coordTwo = document.getElementById("rwyEndTwo").value;

        coordOne = coordOne.replace(/"/g, "").replace(/ /g, "").replace("[", "").replace("]", "").replace(/N/g, "").replace(/E/g, "").replace(/S/g, "-").replace(/W/g, "-");
        coordTwo = coordTwo.replace(/"/g, "").replace(/ /g, "").replace("[", "").replace("]", "").replace(/N/g, "").replace(/E/g, "").replace(/S/g, "-").replace(/W/g, "-");

        var coordOneSplit = coordOne.split(",");
        var coordTwoSplit = coordTwo.split(",");

        var latOneToConv = coordOneSplit[0];
        var lonOneToConv = coordOneSplit[1];
        var latTwoToConv = coordTwoSplit[0];
        var lonTwoToConv = coordTwoSplit[1];

        /*---Convert to decimal format--*/
        var latLonOne = convertCoordinates(latOneToConv, lonOneToConv);
        var latLonTwo = convertCoordinates(latTwoToConv, lonTwoToConv);

        coordOne = latLonOne;
        coordTwo = latLonTwo;

        var latOne = latLonOne.split(",")[0];
        var lonOne = latLonOne.split(",")[1];
        var latTwo = latLonTwo.split(",")[0];
        var lonTwo = latLonTwo.split(",")[1];

        /*---Calculate bearing between the points---*/
        var bearingOne = calculateBearing(latOne, lonOne, latTwo, lonTwo).replace(/°/g, "");
        var bearingTwo = calculateBearing(latTwo, lonTwo, latOne, lonOne).replace(/°/g, "");

        output = "";
        var halfNM = 926;
        var oneNM = 1852;

        /*---Generate Centreline for one runway, eg for RWY06/24 this will generate for 06---*/
        var point = [];
        point[0] = latOne;
        point[1] = lonOne;

        var outsideCount = 0;
        
        while (outsideCount < 5) {
            var count = 0;
            while (count < 5) {
                point = PointAtPoint(point[0], point[1], halfNM, bearingTwo);
                var coordsTwo = PointAtPoint(point[0], point[1], halfNM, bearingTwo);

                output += "[" + point[0] + "," + point[1] + "," + coordsTwo[0] + "," + coordsTwo[1] + "],\n";

                point = coordsTwo;

                count ++;
            }
            var perpendicularityPoint = point;
            var perpendicularityBearing = parseFloat(bearingTwo) + 90;

            if (perpendicularityBearing > 360) {
                perpendicularityBearing = perpendicularityBearing - 360;
            }

            var inversePerpendicularityBearing = perpendicularityBearing + 180;
            if (inversePerpendicularityBearing > 360) {
                inversePerpendicularityBearing = inversePerpendicularityBearing - 360;
            }

            perpendicularityPoint = PointAtPoint(perpendicularityPoint[0], perpendicularityPoint[1], halfNM, perpendicularityBearing);
            var perpendicularityPointTwo = PointAtPoint(perpendicularityPoint[0], perpendicularityPoint[1], oneNM, inversePerpendicularityBearing);

            output += "[" + perpendicularityPoint[0] + "," + perpendicularityPoint[1] + "," + perpendicularityPointTwo[0] + "," + perpendicularityPointTwo[1] + "],\n";

            outsideCount ++;
        }

        /*---Generate Centreline for the other runway, eg for RWY06/24 this will generate for 24---*/
        outsideCount = 0;

        point[0] = latTwo;
        point[1] = lonTwo;

        while (outsideCount < 5) {
            var count = 0;
            while (count < 5) {
                point = PointAtPoint(point[0], point[1], halfNM, bearingOne);
                var coordsTwo = PointAtPoint(point[0], point[1], halfNM, bearingOne);

                output += "[" + point[0] + "," + point[1] + "," + coordsTwo[0] + "," + coordsTwo[1] + "],\n";

                point = coordsTwo;

                count ++;
            }
            var perpendicularityPoint = point;

            var perpendicularityBearing = parseFloat(bearingOne) + 90;
            if (perpendicularityBearing > 360) {
                perpendicularityBearing = perpendicularityBearing - 360;
            }

            var inversePerpendicularityBearing = perpendicularityBearing + 180;
            if (inversePerpendicularityBearing > 360) {
                inversePerpendicularityBearing = inversePerpendicularityBearing - 360;
            }

            perpendicularityPoint = PointAtPoint(perpendicularityPoint[0], perpendicularityPoint[1], halfNM, perpendicularityBearing);
            var perpendicularityPointTwo = PointAtPoint(perpendicularityPoint[0], perpendicularityPoint[1], oneNM, inversePerpendicularityBearing);

            if (outsideCount == 4) {
                output += "[" + perpendicularityPoint[0] + "," + perpendicularityPoint[1] + "," + perpendicularityPointTwo[0] + "," + perpendicularityPointTwo[1] + "]";
            }
            else {
                output += "[" + perpendicularityPoint[0] + "," + perpendicularityPoint[1] + "," + perpendicularityPointTwo[0] + "," + perpendicularityPointTwo[1] + "],\n";
            }
            outsideCount ++;
        }

        /*---Present the result to the user---*/
        document.getElementById('allOut').classList.remove('hideBottom');
        document.getElementById('allIn').classList.add('hideTop');
        show();
    }
    catch (error) {
        document.getElementById('rwyEndOne').classList.add('error');
        document.getElementById('rwyEndTwo').classList.add('error');
    }
}

function copy(toCopy) {
    try {
        if (toCopy == undefined) {
            toCopy = output;
        }

        // Create a dummy input to copy the string array inside it
        var dummy = document.createElement("input");

        // Add it to the document
        document.body.appendChild(dummy);

        // Set its ID
        dummy.setAttribute("id", "dummy_id");

        // Output the array into it
        document.getElementById("dummy_id").value = toCopy;

        // Select it
        dummy.select();

        // Copy its contents
        document.execCommand("copy");

        // Remove it as its not needed anymore
        document.body.removeChild(dummy);

        document.getElementById('labelTwo').innerHTML = "The generated centreline has been copied to yout clipboard";
        document.getElementById('out').innerHTML = "";

        document.getElementById('showButton').setAttribute('onclick', 'show()');
        document.getElementById('showButton').setAttribute('data-text', 'Show Full Output Instead');
    }
    catch(error) {
        console.log(error);
        document.getElementById('labelTwo').innerHTML = "Could not copy to clipboard. Here is your output:";
        document.getElementById('out').innerHTML = output;
    }
}

function back() {
    document.getElementById('rwyEndOne').value = "";
    document.getElementById('rwyEndTwo').value = "";

    document.getElementById("allOut").classList.add('hideBottom');
    document.getElementById("allIn").classList.remove('hideTop');
}

function show() {
    document.getElementById('labelTwo').innerHTML = "Here is your output:";
    document.getElementById('out').innerHTML = output;

    document.getElementById('showButton').setAttribute('onclick', 'copy()');
    document.getElementById('showButton').setAttribute('data-text', 'Copy to Clipboard');
}

function validateOne() {
    document.getElementById("rwyEndOne").classList.remove("error");
}

function validateTwo() {
    document.getElementById("rwyEndTwo").classList.remove("error");
}








function convertCoordinates(lat, lon) {
    if (lat.includes("m")) {
        var degrees = lat.split("d");
        var degree = parseFloat(degrees[0]);
        var decimal = degrees[1];
        
        var minutes = decimal.split("m");
        var minute = parseFloat(minutes[0]);
        var second = parseFloat(minutes[1]);
        
        var degreeCheck = degree.toString();

        if (degreeCheck.includes("-")) {
            var latConverted = degree - (minute / 60) - (second / 3600);
        }
        else {
            var latConverted = degree + (minute / 60) + (second / 3600);
        }
        
        var latStr = latConverted + "";
        
        var endAt = 12;
        var latCount = latStr.length;
        
        if (latCount < 12) {
            endAt = latCount;
        }
        
        lat = latStr.substring(0, endAt);
    }
    else if (lat.includes("d")) {
        var degrees = lat.split("d");
        var degree = parseFloat(degrees[0]);
        var decimal = parseFloat(degrees[1]);

        var degreeCheck = degree.toString();

        if (degreeCheck.includes("-")) {
            var latConverted = degree - (decimal / 60);
        }
        else {
            var latConverted = degree + (decimal / 60);
        }

        var latStr = latConverted + "";
        
        var endAt = 12;
        var latCount = latStr.length;
        
        if (latCount < 12) {
            endAt = latCount;
        }
        
        lat = latStr.substring(0, endAt);
    }
    
    if (lon.includes("m")) {
        var degrees = lon.split("d");
        var degree = parseFloat(degrees[0]);
        var decimal = degrees[1];
        
        var minutes = decimal.split("m");
        var minute = parseFloat(minutes[0]);
        var second = parseFloat(minutes[1]);
        
        var degreeCheck = degree.toString();

        if (degreeCheck.includes("-")) {
            var lonConverted = degree - (minute / 60) - (second / 3600);
        }
        else {
            var lonConverted = degree + (minute / 60) + (second / 3600);
        }
        
        var lonStr = lonConverted + "";
        
        var endAt = 12;
        var lonCount = lonStr.length;
        
        if (lonCount < 12) {
            endAt = lonCount;
        }
        
        lon = lonStr.substring(0, endAt);
    }
    else if (lon.includes("d")) {
        var degrees = lon.split("d");
        var degree = parseFloat(degrees[0]);
        var decimal = parseFloat(degrees[1]);

        var degreeCheck = degree.toString();

        if (degreeCheck.includes("-")) {
            var lonConverted = degree - (decimal / 60);
        }
        else {
            var lonConverted = degree + (decimal / 60);
        }

        var lonStr = lonConverted + "";
        
        var endAt = 12;
        var lonCount = lonStr.length;
        
        if (lonCount < 12) {
            endAt = lonCount;
        }
        
        lon = lonStr.substring(0, endAt);
    }
    return(lat + "," + lon)
}

function calculateBearing(lat1, lon1, lat2, lon2) {
    var bearing = Bearing(lat1, lon1, lat2, lon2);
    return(bearing);
}

function Bearing(lat1, lon1, lat2, lon2) {
	// http://www.movable-type.co.uk/scripts/LatLong.html
	if (Math.abs(parseFloat(lat1)) > 90 || Math.abs(parseFloat(lon1)) > 180 || Math.abs(parseFloat(lat2)) > 90 || Math.abs(parseFloat(lon2)) > 180) {
        return 'n/a'; 
    }
    lat1 = degToRad(lat1); 
    lon1 = degToRad(lon1);
    lat2 = degToRad(lat2); 
    lon2 = degToRad(lon2);

	var deltaLat = lat2-lat1;
    var deltaLon = lon2-lon1;
    
	var bearing = Math.atan2((Math.sin(deltaLon)*Math.cos(lat2)) , (Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(deltaLon)) );
	
    bearing = radToDeg(bearing);
    if (bearing < 0) { bearing += 360; }
    return (Math.round(1000 * bearing) / 1000) + String.fromCharCode(176);
}

function degToRad(deg) {
    var rad = parseFloat(deg) * 3.14159265358979 / 180;
    return(rad);
}

function radToDeg(rad) {
    var deg = Math.round(10000000 * parseFloat(rad) * 180 / 3.14159265358979) / 10000000;
    return(deg);
}

function PointAtPoint(latOne,lonOne,distance,bearing) {
	var endPoint = []; // output
	var earthRadius = 6378137;
	var latOneRad = degToRad(latOne);
	var latTwoRad = degToRad(lonOne);
	var distance = distance;
	
    bearing = bearing;
    
	if (Math.abs(bearing) >= 360) { 
        bearing = bearing % 360; 
    }

    bearing = (bearing < 0) ? bearing+360 : bearing;
    
	var halfGlobe = (bearing <= 180) ? 1 : 0; // western half of circle = 0, eastern half = 1
    var bearingInversed = 360-bearing; // this subroutine measures angles COUNTER-clockwise, so +3 becomes +357
    
    bearingInversed = degToRad(bearingInversed); 
    var bb = (Math.PI / 2) - latOneRad; 
    var cc = distance / earthRadius;

    var sin_bb = Math.sin(bb); 
    var cos_bb = Math.cos(bb); 
    var cos_cc = Math.cos(cc);

    var cos_aa = cos_bb * cos_cc + (sin_bb * Math.sin(cc) * Math.cos(bearingInversed));
    
	if (cos_aa <= -1) { 
        cos_aa = -1; 
    } 
    if (cos_aa >= 1) { 
        cos_aa = 1; 
    }

    var aa = (cos_aa.toFixed(15) == 1) ? 0 : Math.acos(cos_aa);
    
    var cos_c = (cos_cc - (cos_aa * cos_bb)) / (Math.sin(aa) * sin_bb);
    
	if (cos_c <= -1) { 
        cos_c = -1; 
    }
    if (cos_c >= 1) { 
        cos_c = 1; 
    }

    var c = (cos_c.toFixed(15) == 1) ? 0 : Math.acos(cos_c);
    
	var endLat = (Math.PI / 2) - aa;
	var endLon = latTwoRad - c;
	if (halfGlobe == 1) { 
        endLon = latTwoRad + c; 
    }
	if (endLon > Math.PI) { 
        endLon = endLon - (2 * Math.PI); 
    }
	if (endLon < (0 - Math.PI)) { 
        endLon = endLon + (2 * Math.PI); 
    }
    endPoint[0] = radToDeg(endLat); 
    endPoint[1] = radToDeg(endLon);

	// Use proportional error to adjust things due to oblate Earth; I'm still not entirely sure how/why this works:
	for (i=0; i<5; i++) {
		var vincenty = Vincenty_Distance(latOne,lonOne,endPoint[0],endPoint[1],false,true);
		if (Math.abs(lonOne-endPoint[1]) > 180) {
			console.log('This definitely should not happen!');
		} else {
			var error = (vincenty != 0) ? distance/vincenty : 1;
			var dlat = endPoint[0]-parseFloat(latOne); var dlon = endPoint[1]-parseFloat(lonOne);
			endPoint[0] = parseFloat(latOne)+(dlat*error); endPoint[1] = parseFloat(lonOne)+(dlon*error);
		}
	}
	return (endPoint);
}









function Vincenty_Distance(lat1,lon1,lat2,lon2,us,meters_only) {
	if (Math.abs(parseFloat(lat1)) > 90 || Math.abs(parseFloat(lon1)) > 180 || Math.abs(parseFloat(lat2)) > 90 || Math.abs(parseFloat(lon2)) > 180) { return 'n/a'; }
	if (lat1 == lat2 && lon1 == lon2) { return '0'; }
	
	lat1 = degToRad(lat1); lon1 = degToRad(lon1);
	lat2 = degToRad(lat2); lon2 = degToRad(lon2);

	var a = 6378137, b = 6356752.3142, f = 1/298.257223563;
	var L = lon2 - lon1;
	var U1 = Math.atan((1-f) * Math.tan(lat1));
	var U2 = Math.atan((1-f) * Math.tan(lat2));
	var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
	var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
	var lambda = L, lambdaP = 2*Math.PI;
	var iterLimit = 50;
	while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit > 0) {
		var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
		var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) + 
		  (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
		var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
		var sigma = Math.atan2(sinSigma, cosSigma);
		var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
		var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
		var cos2SigmaM = (!cosSqAlpha) ? 0 : cosSigma - 2*sinU1*sinU2/cosSqAlpha;
		var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
		lambdaP = lambda;
		lambda = L + (1-C) * f * Math.sin(alpha) * (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
	}
	if (iterLimit==0) { return (NaN); }  // formula failed to converge
	var uSq = cosSqAlpha*(a*a-b*b)/(b*b);
	var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
	var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
	var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM) - B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
	var s = b*A*(sigma-deltaSigma); var m = s;
	if (meters_only) {
		return m;
	} else if (us==2) { // nautical
		var nm = m/1852; var feet = m*3.28084;
		if (feet < 1000) {
			if (feet < 1000) {
				return (Math.round(10*feet) / 10) + ' ft';
			} else {
				return (Math.round(feet) / 1) + ' ft';
			}
		} else {
			return (Math.round(1000*nm) / 1000) + ' NM';
		}
	} else if (us) { // U.S.
		var miles = m/1609.344; var feet = m*3.28084;
		if (feet < 1000) {
			if (feet < 1000) {
				return (Math.round(10*feet) / 10) + ' ft';
			} else {
				return (Math.round(feet) / 1) + ' ft';
			}
		} else {
			return (Math.round(1000*miles) / 1000) + ' mi';
		}
	} else { // metric
		var km = m/1000;
		if (km < 1) {
			if (m < 1000) {
				return (Math.round(10*m) / 10) + ' m';
			} else {
				return (Math.round(m) / 1) + ' m';
			}
		} else {
			return (Math.round(1000*km) / 1000) + ' km';
		}
	}
}