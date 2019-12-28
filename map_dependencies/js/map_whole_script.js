<script>
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
        /*var legend = L.control({
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
                 :'Hover over a country to reveal relevant information');                                                                    
        }
        //add to map
        legend.addTo(map)*/
		
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
		/////////////////////////CLICK EVENTS//////////////////////////////
		countriesLayer.eachLayer(function(layer,feature){
           //isolate countries that have showpopup feature//
           if(layer.feature.properties.showPopup){
               layer.bindPopup('<h5>'+layer.feature.properties.name+'</h5>'+
                               '<b>' +'<p>Population (2016): '+'</b>'+ layer.feature.properties.population +' million'+'<br>'
                               +'<b>'+'Net Salary (2017): '+'</b>'+ layer.feature.properties.NET_Salary+'<br>'
                               +'<b>'+'Surface: '+'</b>'+layer.feature.properties.surface+' km'+'<sup>'+2+'</sup>'+'</p>');
           }
        }).addTo(map);
        
        //only works when hover highlight is commented out//
        
		/////////////////////////////////////////////////////////////////////////////////
		/////////////////////////HIGHLIGHT FEATURE ON HOVER//////////////////////////////
		/*function highlightCountry(e){
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
        }).addTo(map);*/
		
		/*
		////////////////////////////////////////////////////////////
		//////////////////////////////SIMPLE MARKERS////////////////
		var MarkerSpain= L.marker([40,-4],{
				keyboard:true,
				title:'Spain Marker'
		
		
		})
		.addTo(map)
		
		var MarkerUK= L.marker([52,-1],{
				keyboard:true,
				title:'UK Marker'
		
		
		})
		.addTo(map)
		
		var MarkerItaly = L.marker([42,13],{
				keyboard:true,
				title:'Italy Marker'
		
		})
		.addTo(map)
		
        //////////////////////////////POPUP/////////////////////////
        var myPopup = L.popup({
                className: 'kkpopup',
                maxHeight: 150
            })
            .setLatLng([48, 2])
            .setContent('<div><h2>Popup title</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, quasi, libero eligendi, dignissimos natus, doloribus minima assumenda laudantium veritatis odit consectetur dolores sed nisi laborum! Harum sit incidunt asperiores nulla.</p><h2>Images</h2><img src="css/images/mapsoftheimagination.jpg" alt="" style="width:100%;"><h2>Videos</h2><iframe width="100%" height="100%" src="https://www.youtube.com/embed/x8PCoSsqt9M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>')

        var popupMarkerFrance = L.marker([45, 2], {
                keyboard: true,
                title: 'France Marker'
            })
            .addTo(map)
            .bindPopup(myPopup)

        //////////////////////////////TOOLTIP/////////////////////////
        var tooltipMarkerGermany = L.marker([50, 10], {
                keyboard: true,
                title: 'Germarny tooltip'
            })
            .addTo(map)
            .bindTooltip('Tooltip text')
		*/
		
		
		
		/////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////ADD STATIC LEGEND///////////////////////////////////
        var legend = L.control({
            position: 'topright'
        });
        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'mapLegend');
            div.innerHTML = '<h3>UK-EU bilateral countries relations</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, sint obcaecati, nulla, ducimus nostrum, sunt neque sed a cum nobis quo in distinctio minus impedit sequi porro suscipit beatae enim!</p><b><p>Click on each country to reveal relevant information</p></b>';
            return div;
        }
        legend.addTo(map)
		
    </script>