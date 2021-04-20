window.onload = init;

function init(){

    const map = new ol.Map({
        view: new ol.View({
        center: [0,0],
        zoom:3,
    }),
    /*layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                zindex: 1,
                visible: false
            })
        ],*/
        target:'js-map'
})
//Base Layers

//OpenStreet Map Standard
const openStreetMapStandardLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: 'OSMStandard'
})
 const openStreetMapHumanitarian = new ol.layer.Tile({
     source: new ol.source.OSM({
         url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
     }),
     visible: false,
     title: 'OSMHumanitarian'

 })

const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
        key: "AungYwKQxWTQeflUqXNT9ny1IXVk1SMVEECTrbezqTlYQz9GCtrAtFb-BqkBMbAt",
        imagerySet: 'Aerial'//WithLabels'// Road, Canvas, Canvas Gray
        }),
        visible: false,
        title: 'BingMaps'
})
 //CARTOdb basemap layer
const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url:'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
    }),
    visible: false,
    title:'Carto_DB'
})



/*Layer Group
const layerGroup = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title:'BingMaps'
        }),
        //Bing Map Layer
        new ol.layer.Tile({
            source: new ol.source.BingMaps({
            key: "AungYwKQxWTQeflUqXNT9ny1IXVk1SMVEECTrbezqTlYQz9GCtrAtFb-BqkBMbAt",
            imagerySet: 'AerialWithLabels'// Road, Canvas, Canvas Gray
            }),
            visible: true
        })
    ]})
   */
    //var typeSelect = document.getElementById('type');

    var drawSource =  new ol.source.Vector()
    var drawLayer = new ol.layer.Vector({
        source:drawSource
    })
    var draw = new ol.interaction.Draw({
        source:drawSource,
        //minpoints:3,
        type: "Polygon",
        freehand: false
        
    })
    

    drawSource.on('addfeature', function(evt){
    var feature = evt.feature;
    var coords = feature.getGeometry().getCoordinates();
    console.log(coords);
//    var blob = new Blob(coords,{type: 'text/plain'});
//var blob = bb.getBlob("elexamp/binary");
    //saveAs(blob, "data.dat");

    //localStorage.setItem('myBlob.txt', blob)
//    blob.name = 'coords.txt';
 //   var file = new File([blob], "coords.txt");
})
  

  
const tileDebugLayer =  new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: true,
    title: 'TileDebugLayer'
})
//stamenasemap lauers
const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
        layer: 'terrain'
    }),
    visible: false
})


///Tile ArcGIS

// Here the Tiled layers Are Added
const tileArcGISLayer = new ol.layer.Tile(
    {
        source: new ol.source.TileArcGISRest({
            url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/WaterTemplate/LocalGovernmentInfrastructureBasemap/MapServer"
        }), 
        visible: true,
        title: 'TileArcGISLayer'
    }
) 
//Raster Tile Layer
const rasterTileLayerGroup = new ol.layer.Group({
    layers:[
        tileDebugLayer, tileArcGISLayer
    ]
})
//map.addLayer(rasterTileLayerGroup);

//LayerSwitcher For Raster Tile Layer

//Interaction Code

/*
const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]')
console.log(tileRasterLayerElements);
for(let tileRasterLayerElement of tileRasterLayerElements){
    tileRasterLayerElement.addEventListener('change',function(){
       // console.log(this.value);
       let tileRasterLayerElementValue = this.value;
       let tileRasterLayer;
       rasterTileLayerGroup.getLayers().forEach(function(element, index, array){
           console.log(element.get('title'));
           if(tileRasterLayerElementValue === element.get('title')){
               tileRasterLayer = element;
           }
       })
       this.checked ? tileRasterLayer.setVisible(true):tileRasterLayer.setVisible(false)
    })
}*/
// NOAA 
/*const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url:,
        p
    })
})*/
const baseLayerGroup = new ol.layer.Group({
    layers:[
    openStreetMapStandardLayer, openStreetMapHumanitarian, bingMaps,cartoDBBaseLayer]

})

map.addLayer(baseLayerGroup)
map.addInteraction(draw)
map.addLayer(drawLayer)

/* Layer Switcher Logic For Base Layer */
const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
//
for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
      console.log(this.value);
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, array)
      {
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName == baseLayerElementValue)  
        //console.log(element.get('title'));
        //console.log('baseLayerName: '+ baseLayerName, 'BaseLayerElementValue: '+ baseLayerElementValue);
        //console.log(baseLayerName === baseLayerElementValue)
        console.log(element.get('title'), element.get('visible'));
  
    })
    })
}
/* Geometry Switcher
const baseLayerGeometries = document.querySelectorAll('.sidebar > input[type=radio]')
//
for(let baseLayerGeometry of baseLayerGeometries){
    baseLayerGeometry.addEventListener('change', function(){
      console.log(this.value);
      let baseLayerGeometryValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, array)
      {
        let baseLayerGeometryName = element.get('title');
        element.setVisible(baseLayerGeometryName == baseLayerGeometryValue)  
        //console.log(element.get('title'));
        //console.log('baseLayerName: '+ baseLayerName, 'BaseLayerElementValue: '+ baseLayerElementValue);
        //console.log(baseLayerName === baseLayerElementValue)
        console.log(element.get('title'), element.get('visible'));
  
    })
    })
}*/


const openstreetMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: '',
        imageExtent: [-9995146.345445339,-9956986.266515493,-62867.24088149518,-74121.48585495353]
    })
   
})
map.on('click', function(e){
    console.log(e.coordinate);
})
//map.addLayer(openstreetMapFragmentStatic);
//map.addLayer(cartoDBBaseLayer);
//map.addLayer(tileDebugLayer);
//map.addLayer(stamenBaseLayer);
//map.addLayer(tileArcGISLayer);
}