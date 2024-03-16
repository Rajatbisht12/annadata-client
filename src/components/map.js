import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";
import geoJson from "./map.json";
import { useGeolocated } from "react-geolocated";


mapboxgl.accessToken = "pk.eyJ1IjoicHJpeWFuc2h1YnV0b2xhIiwiYSI6ImNsdHJqemkzajBnOHUybm9hdHVqOHFkeGIifQ.2p1vFA3zNPvCYr5O8jXLhg";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [Center, setCentre] = useState([0,0]);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  

  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const requestGeolocation = useCallback(() => {
    if (isGeolocationAvailable && !isGeolocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setIsLoadingLocation(false); // Stop loading even on error
        }
      );
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  useEffect(() => {
    if (coords) {
      setLat(coords.latitude);
      setLong(coords.longitude);
      setIsLoadingLocation(false);
    } else if (isGeolocationAvailable && isGeolocationEnabled) {
      requestGeolocation(); // Call requestGeolocation if needed
    } else {
      setIsLoadingLocation(true);
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled, requestGeolocation]);

  useEffect(() => {
    setCentre([lat, long]);
  },[lat, long]);

  

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: Center,
      zoom: 10,
    });
    
    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions:{
          enableHighAccuracy: true
        },

        trackUserLocation: true,
        showUserHeading : true
      })
    )

    map.on('click', 'points', (e) => {
      // Check for clicked feature
      if (e.features.length === 0) {
        return;
      }
    
      const clickedFeature = e.features[0];
    
      // Get feature type and coordinates
      const featureType = clickedFeature.geometry.type;
      const coordinates = clickedFeature.geometry.coordinates;
    
      let popupContent;
    
      switch (featureType) {
        case 'Point':
          // Example: Display basic point information (adjust based on your needs)
          popupContent = `Point at coordinates: ${coordinates.join(', ')}`;
          break;
        case 'LineString':
          // Example: Display line details (modify based on your data)
          const firstPoint = coordinates[0];
          const lastPoint = coordinates[coordinates.length - 1];
          popupContent = `Line from ${firstPoint.join(', ')} to ${lastPoint.join(', ')}`;
          break;
        default:
          popupContent = 'Unsupported feature type';
      }
    
      // Create and display popup
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map);
    });
    

    // const handleClick = (e) => {
    //   if (e.features.length === 0) {
    //     return; // No features clicked
    //   }
    
    //   const feature = e.features[0];
    //   new mapboxgl.Popup()
    // .setLngLat(feature.geometry.coordinates)
    // .setHTML(feature.properties.formatted_coordinates)
    // .addTo(map);
    // };

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    console.log(Center);
    // Clean up on unmount
    return () => map.remove();
  }, [Center]);

  return (
    <div ref={mapContainerRef} state={isLoadingLocation} className="map-container" />
  );
};


export default Map;