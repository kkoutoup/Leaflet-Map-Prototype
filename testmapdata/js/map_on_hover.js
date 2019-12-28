//Create map and assign it to variable
        var map = L.map("map", {
            //initial geographic centre of map
            center: [50, 9],
            //zoom control switch and initial map zoom level
            zoomControl: true,
            zoom: 4.2,
            //leaflet logo
            attributionControl: true,
            //draggable map
            dragging: true,
            doubleClickZoom: true,
            fadeAnimation: true,
            keyboard: true,
            //popup control
            closePopupOnClick: true,
            //zoomAnimation
            zoomAnimation: true,
            keyboardPanDelta: 100
        });
        
        //Create new geojson layer and add it to map
        var countriesLayer = L.geoJson(countries).addTo(map);
        
		/////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////ADD DYNAMIC LEGEND///////////////////////////////////
        var legend = L.control({
            position: 'topright'
        });
        
        legend.onAdd = function(map) {
            //create div with class of mapLegend
            this._div = L.DomUtil.create('div', 'mapLegend');
            //define update method
            this.update();
            return this._div;
        }
        legend.update = function(props){
            this._div.innerHTML = '<h4>Country information</h4>'+(props ? 
                 '<b>' +'<p>Country name: '+'</b>'+ props.name_long +'</p>'
                +'<b>' +'<p>Population (2016): '+'</b>'+ props.population +' million'+'</p>'  
                +'<b>' +'<p>Net Salary (2017): '+'</b>'+ props.NET_Salary+'</p>'                                                  
                 :'<b>'+'<p>Hover over a country to reveal relevant information</p>'+'</b>');                                                                    
        }
        //add to map
        legend.addTo(map)
		
		/////////////////////////////////////////////////////////////////////////
        //////////////////////////////COLOUR COUNTRIES///////////////////////////
        function colourCountries(feature) {
            var countryColor = feature.properties.countryColor;
            if (countryColor) {
                return {
                    fillColor: countryColor,
                    fillOpacity: 1,
                    color: '#ffffff',
                    opacity: 0.7,
                    weight: 1
                }
            } else {
                return {
                    fillColor: '#DAE3E8',
                    fillOpacity: 1,
                    color: '#ffffff',
                    opacity: 1,
                    weight: 1
                }
            }

        }
        //add effect to map
        var countriesLayer = L.geoJson(countries, {
            style: colourCountries
        }).addTo(map);

		/////////////////////////////////////////////////////////////////////////////////
		/////////////////////////HIGHLIGHT FEATURE ON HOVER//////////////////////////////
	     function highlightCountry(e){
            //set mouse target
			var layer = e.target;
			
            //define style
			layer.setStyle({
				fillColor: "#fff",
				fillOpacity: 0.5
			});
		    //ie, opera handling
			if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
				layer.bringToFront();
			}
		    legend.update(layer.feature.properties)
		}
		//define resetHighlight for mouseout
		function resetHighlight(e){
			countriesLayer.resetStyle(e.target);
            legend.update();
		}
		//mouseover and mouseout events
		function onEachFeature(feature,layer){
            //isolate coloured countries
            var onMouseHover = feature.properties.onMouseHover;
            if(onMouseHover){
                layer.on({
                    mouseover:highlightCountry,
                    mouseout: resetHighlight
                });
            }
		}
		//add functionality to map
		var countriesLayer = L.geoJson(countries, {
			style: colourCountries,
            onEachFeature:onEachFeature
        }).addTo(map);