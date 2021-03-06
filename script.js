import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

import { gsap } from './build/gsap/all.js'
let sceneReady = false

const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)

        window.setTimeout(() =>
        {
            sceneReady = true
        }, 2000)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
const gltfLoader = new GLTFLoader(loadingManager)
const gltfLoader1 = new GLTFLoader(loadingManager)

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
/**
 * Base
 */
// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Overlay
 */

const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})



const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


/**
 * Update all materials
 */
 const updateAllMaterials = () =>
 {
     scene.traverse((child) =>
     {
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
             // child.material.envMap = environmentMap
             child.material.envMapIntensity = debugObject.envMapIntensity
             child.material.needsUpdate = true
             child.castShadow = true
             child.receiveShadow = true
         }
     })
 }
/**
 * Environment map
 */
 const environmentMap = cubeTextureLoader.load([
    '../assets/textures/environmentMaps/0/px.jpg',
    '../assets/textures/environmentMaps/0/nx.jpg',
    '../assets/textures/environmentMaps/0/py.jpg',
    '../assets/textures/environmentMaps/0/ny.jpg',
    '../assets/textures/environmentMaps/0/pz.jpg',
    '../assets/textures/environmentMaps/0/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 5




var video = document.getElementById( 'video' );
 //video.play();
 video.addEventListener( 'play', function () {
  video.muted = false;
  // this.currentTime = 3;

 } );


 var vtexture = new THREE.VideoTexture( video );
 vtexture.mapping = THREE.EquirectangularReflectionMapping;
  vtexture.minFilter = THREE.LinearFilter;
 vtexture.magFilter = THREE.LinearFilter;
 vtexture.format = THREE.RGBFormat;
 vtexture.generateMipmaps = false;
 
 // console.log(vtexture)

 /////////////////////////////// tv 

 const pwgeometry = new THREE.PlaneGeometry( 0.9, 0.5 );
 const bwgeometry= new THREE.BoxGeometry(0.85,0.45,0.01)
 const pwmaterial = new THREE.MeshBasicMaterial( {map :vtexture ,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1  } );



//tv screen
 const wplane = new THREE.Mesh( pwgeometry, pwmaterial );
wplane.position.set(-1.31,0.605,-0.72)
wplane.name="tvscreen"
 scene.add( wplane );

console.log(pwmaterial)
//tv set 


///////////////////////////////////
var TextureLoader= new THREE.TextureLoader();
var resetTexture = TextureLoader.load('../assets/back.png')
console.log(resetTexture)

var linkTexture = TextureLoader.load('../assets/link.png')

var playTexture = TextureLoader.load('../assets/play.png')
var pauseTexture = TextureLoader.load('../assets/pause.png')

var tvdetailsTexture = TextureLoader.load('../assets/Tv.png')
var d_detailsTexture = TextureLoader.load('../assets/Dining_Table.png')
var sofadetailsTexture = TextureLoader.load('../assets/Sofad.png')
var tabledetailsTexture = TextureLoader.load('../assets/Tea_Table.png')
///////////////////////////////////////
const tvdmaterial = new THREE.MeshBasicMaterial( {map :tvdetailsTexture ,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false} );

const detailsgeometry = new THREE.PlaneGeometry( 0.5, 0.25 );
const tvplane = new THREE.Mesh( detailsgeometry, tvdmaterial );
tvplane.name= "tvdetails"
tvplane.position.set(-1.31,1.1,-0.72)
///////////////////


// console.log(tvdetails)
scene.add(tvplane)

const resetGeometry = new THREE.PlaneGeometry(0.0725,0.0725)
const resetmaterial = new THREE.MeshBasicMaterial( {map :resetTexture,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false } );
const linkmaterial = new THREE.MeshBasicMaterial( {map :linkTexture,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false } );
const playmaterial = new THREE.MeshBasicMaterial( {map :playTexture,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false } );
const pausematerial = new THREE.MeshBasicMaterial( {map :pauseTexture,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false } );
////////////////////////////////////////////// 
const tv_resetPlane= new THREE.Mesh(resetGeometry,resetmaterial)
 tv_resetPlane.name="resetButton"
 tv_resetPlane.userData={url:'https://www.ikea.com/in/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s09216755/'}
 tv_resetPlane.position.set(-1,1.2,-0.72)
 console.log(tv_resetPlane)
 scene.add(tv_resetPlane)

 const tv_linkPlane= new THREE.Mesh(resetGeometry,linkmaterial)
 tv_linkPlane.name="tvlink"
tv_linkPlane.position.set(-1,1.1,-0.72)
scene.add(tv_linkPlane)

const play_Plane= new THREE.Mesh(resetGeometry,playmaterial)
play_Plane.name="play"
play_Plane.position.set(-0.9,1.2,-0.72)
scene.add(play_Plane)

const pause_Plane = new THREE.Mesh(resetGeometry,pausematerial)
pause_Plane.name="pause"
pause_Plane.position.set(-0.9,1.1,-0.72)
scene.add(pause_Plane)


 const tvset = new THREE.Group()
 tvset.add(tvplane,tv_resetPlane,tv_linkPlane,play_Plane,pause_Plane)
 scene.add(tvset)
 tvset.visible=false

 ///////////////////////////////////////////////////////// dining table set 
const diningset = new THREE.Group()
const d_dmaterial = new THREE.MeshBasicMaterial( {map :d_detailsTexture ,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false} );
 const dplane = new THREE.Mesh(detailsgeometry,d_dmaterial)
 dplane.position.set(2.75,0.8,0.25)
 dplane.rotation.y=Math.PI/2
 scene.add( dplane)

 const d_linkPlane= new THREE.Mesh(resetGeometry,linkmaterial)
 d_linkPlane.name="dininglink"
d_linkPlane.position.set(2.75,0.8,-0.1)
d_linkPlane.rotation.y=Math.PI/2
scene.add(d_linkPlane)


 const dining_resetPlane= new THREE.Mesh(resetGeometry,resetmaterial)
 dining_resetPlane.name="resetButton"
 dining_resetPlane.userData={url:'https://www.ikea.com/in/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s09216755/'}
 dining_resetPlane.position.set(2.75,0.9,-0.1)
 dining_resetPlane.rotation.y=Math.PI/2 
 console.log(dining_resetPlane)
 scene.add(dining_resetPlane)
diningset.add(dplane,dining_resetPlane,d_linkPlane)
scene.add(diningset)
diningset.visible=false


///////////////////////////////////////////////////////// sofa  set 
const sofaset = new THREE.Group()
const sofadmaterial = new THREE.MeshBasicMaterial( {map :sofadetailsTexture ,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false} );
const splane = new THREE.Mesh(detailsgeometry,sofadmaterial)
splane.position.set(-1.5,0.8,2.4)
splane.rotation.y=Math.PI
scene.add( splane)

const s_linkPlane= new THREE.Mesh(resetGeometry,linkmaterial)
s_linkPlane.name="sofalink"
s_linkPlane.position.set(-1.8,0.8,2.4)
s_linkPlane.rotation.y=Math.PI
scene.add(s_linkPlane)

const sofa_resetPlane= new THREE.Mesh(resetGeometry,resetmaterial)
sofa_resetPlane.name="resetButton"
sofa_resetPlane.userData={url:'https://www.ikea.com/in/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s09216755/'}
sofa_resetPlane.position.set(-1.8,0.9,2.4)
sofa_resetPlane.rotation.y=Math.PI
console.log(sofa_resetPlane)
scene.add(sofa_resetPlane)

sofaset.add(splane,sofa_resetPlane,s_linkPlane)
scene.add(sofaset)
sofaset.visible=false


/////////////////////////////////////////////////////////  table set 

const tableset = new THREE.Group()
const tabledmaterial = new THREE.MeshBasicMaterial( {map :tabledetailsTexture ,color: 0xFFFFFF, side: THREE.DoubleSide, opacity:1 , transparent:true ,depthWrite: false,depthTest: false} );

const tplane = new THREE.Mesh(detailsgeometry,tabledmaterial)
tplane.position.set(-1.3,0.51,1.1)
//tplane.rotation.y= Math.PI/2
scene.add( tplane)

const t_linkPlane= new THREE.Mesh(resetGeometry,linkmaterial)
t_linkPlane.name="tablelink"
t_linkPlane.position.set(-1,0.5,1.1)
//t_linkPlane.position.set(-1,0.525,1.01)
//t_linkPlane.rotation.y=Math.PI/2
scene.add(t_linkPlane)

const table_resetPlane= new THREE.Mesh(resetGeometry,resetmaterial)
table_resetPlane.name="resetButton"
table_resetPlane.userData={url:'https://www.ikea.com/in/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s09216755/'}
table_resetPlane.position.set(-1,0.6,1.1)
//table_resetPlane.position.set(-1,0.625,0.8)
//table_resetPlane.rotation.y=Math.PI/2
console.log(table_resetPlane)
scene.add(table_resetPlane)
//table_resetPlane.visible=false;

tableset.add(tplane,table_resetPlane,t_linkPlane)
scene.add(tableset)
tableset.visible=false;
console.log(tableset)









 ////models and var


 
 const boxgeo = new THREE.BoxGeometry(1,1,1)
 const boxmat = new THREE.MeshPhysicalMaterial({color: 0xffff00})
 const box = new THREE.Mesh( boxgeo,boxmat)
 box.position.set(0,0,0)


 
 var table
 var room
 var carpet
 var ground
 var book
 var sofa
  var pear 
  var smallsofa1
  var Wall_Blue
  var target_test= new THREE.Vector3();
  var objects = [];
  var tv
  var carpet1
  var dining_table
  var tvscreen

  var tvframe

  
  
 gltfLoader.load(
     '../assets/Room/New Gltf2/Room New.gltf',
     (gltf)=>{
 
         scene.add(gltf.scene)
         updateAllMaterials()
          room = gltf.scene
         room.scale.set(10,10,10)
         
 
          sofa = gltf.scene.children.find((child=> child.name==='Sofa_Long2'))
      
          carpet = gltf.scene.children.find((child)=> child.name==='Carpet')
          carpet1 = gltf.scene.children.find((child)=> child.name==='Carpet1')
          
          ground = gltf.scene.children.find((child=> child.name==='Ground1'))
          Wall_Blue = gltf.scene.children.find((child=> child.name==='Jadi'))
          tv = gltf.scene.children.find((child=>child.name==='Stand'))
          tvframe= gltf.scene.children.find((child=>child.name==='Frame'))
          //tvscreen = tv.children.find((child=>child.name=='TV1001'))
          tvscreen= gltf.scene.children.find((child=> child.name==='Tv_Screen'))
        
          

          var color = 0x000000;
          tvscreen.material.color.set(color)
         
          console.log(tvscreen.material.color)
        dining_table = gltf.scene.children.find((child=>child.name==='Dining_table2'))
      table = gltf.scene.children.find((child=>child.name==='Table_top'))
      //dining_table.material.map=vtexture
console.log(tv)

      const sofaloader = new THREE.TextureLoader()
      const sofatexture= sofaloader.load('../assets/sofa.png')

      sofa.material.map=sofatexture
      const colorsofa =0x00000
      sofa.material.color.set(colorsofa)

        

        
        
        console.log(sofa)
        var scale = 1.0;
        room.traverse( function ( child ) {

          if ( child instanceof THREE.Mesh ) {

            // child.geometry.center();
            // child.geometry.computeBoundingSphere();
            scale = 0.2 * child.geometry.boundingSphere.radius;

            //const phongMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 5 } );
            //child.material = phongMaterial;
            child.receiveShadow = true;
            child.castShadow = true;

          }
        } );
        
         console.log(gltf.scene)
 /////////////////////////////////////////////////////////////////
 Wall_Blue.addEventListener("click", (event)=>{
      event.stopPropagation();
      tvpos();
  })

 })


 /**
 * Lights
 */
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.normalBias = 0.05
  //directionalLight.position.set(0.25, 3, - 2.25)
  directionalLight.position.set(10, 20, 5)
  scene.add(directionalLight)
 
  const hemishperelight = new THREE.HemisphereLight('#ffffff')
 // hemishperelight.castShadow=true;
  hemishperelight.position.set(0,5,0)
  scene.add(hemishperelight)
  
 
 /**
  * Camera
  */
 
  const camera = new THREE.PerspectiveCamera(
     50,
     window.innerWidth / window.innerHeight,
     0.01,
     100
   );
 
   scene.add(camera);



   const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

controls.maxPolarAngle = Math.PI / 2.125;
controls.minPolarAngle = -Math.PI/2;
controls.enablePan=false;
controls.enableZoom=false;
camera.position.set(1.23,1,-0.8)
controls.target.set(0.115,0.616,0.306)
  //controls.dampingFactor = 1;

controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
}


function table1pos(){
    gsap.to( camera.position, {
        duration: 1,  
        x: 4.2,
        y: 0.94,
        z: -0.07,
        onUpdate: function () {
          camera.updateProjectionMatrix();
          controls.update();
        }
      } );
      gsap.to( controls.target, {
          duration: 1,
          x: 3.35,
          y: 0.59,
          z: 0.27,
          onUpdate: function () {
            controls.update();
            }
          } );
  
          controls.update();
          
  
          console.log(controls.target)
  
          controls.autoRotate=false;
          controls.autoRotate=false;
          if(diningset.visible===false){
            diningset.visible=true
          }
          else{
            diningset.visible=false
          }

          pauseVid()

  }
  
  function tvpos(){
    gsap.to( camera.position, {
        duration: 1,  
        x: -1.16,
        y: 0.78,
        z: 1.12,
        onUpdate: function () {
          camera.updateProjectionMatrix();
          controls.update();
        }
      } );
      gsap.to( controls.target, {
          duration: 1,
          x: -1.16,
          y: 0.62,
          z: 0.14,
          onUpdate: function () {
            controls.update();
            }
          } );
  
          controls.update();
          
  
          console.log(controls.target)
  
          controls.autoRotate=false;
          if(tvset.visible===false){
            tvset.visible=true
          }
          else{
            tvset.visible=false
          }
  }
   

  function startpos(){
    gsap.to( camera.position, {
        duration: 1,  
        x: 1.23,
            y: 1,
            z: -0.8,
        onUpdate: function () {
          camera.updateProjectionMatrix();
          controls.update();
        }
      } );
      gsap.to( controls.target, {
          duration: 1,
          x: 0.115,
              y: 0.616,
              z: 0.306,
          onUpdate: function () {
            controls.update();
            }
          } );
  
          controls.update();
          
  
          console.log(controls.target)
  
          controls.autoRotate=false;
  }

  // gui.add( parameters1, 'sofaposc' ).name( "smallsofa Scene" );
  // //////////////
  function sofapos(){
    gsap.to( camera.position, {
        duration: 1,  
        x: -1.35,
              y: 0.9,
              z: -0.07,
        onUpdate: function () {
          updateCameraOrbit()
          camera.updateProjectionMatrix();
          controls.update();
        }
      } );
      gsap.to( controls.target, {
          duration: 1,
          x: -1.5,
          y: 0.80,
          z: 0.91,
          onUpdate: function () {
            //updateCameraOrbit()
            controls.update();
            }
          } );
  
         // controls.target.copy(tvscreen.position);
          //controls.autoRotate=true;
  
          
          //controls.target.set(1.7,0.06,0.81)
          controls.update();
          //console.log(tvscreen.position)
  
          console.log(controls.target)
  
          controls.autoRotate=false;
          if(sofaset.visible===false){
            sofaset.visible=true
          }
          else{
            sofaset.visible=false
          }

  }
  
        // function (){
        //   gsap.to( camera.position, {
        //       duration: 2,  
              
        //       onUpdate: function () {
        //         updateCameraOrbit();
        //         // camera.updateProjectionMatrix();
        //         controls.update();
        //       }
        //     } );
        //     gsap.to( controls.target, {
        //         duration: 1,
                
        //         onUpdate: function () {
        //           updateCameraOrbit();
        //           //camera.updateProjectionMatrix();
        //           controls.update();
        //           }
        //         } );
        // }
        // //////////////////////////////////////
        function tablepos(){
          gsap.to( camera.position, {
              duration: 1,  
              x: -1.11,
              y: 0.57,
              z: 2.03,
              onUpdate: function () {
                camera.updateProjectionMatrix();
                controls.update();
              }
            } );
            gsap.to( controls.target, {
                duration: 1,
                x: -1.13,
                y: 0.35,
                z: 1.007,
                onUpdate: function () {
                  controls.update();
                  }
                } );
        
               // controls.target.copy(tvscreen.position);
                //controls.autoRotate=true;
        
                
                //controls.target.set(1.7,0.06,0.81)
                controls.update();
                //console.log(tvscreen.position)
        
                console.log(controls.target)
        
                controls.autoRotate=false;

                if(tableset.visible===false){
                  tableset.visible=true
                }
                else{
                  tableset.visible=false
                }
                
        }      

        
        var parameters5 = {
          getpos: function() {
            geos()
          }
        };
        //gui.open();
  
        function geos()
        {
  
          console.log(camera.position)
          console.log(camera.rotation)
          console.log(controls.target)
        }
        // gui.add( parameters5, 'getpos' ).name( "gettingpos" );
  
  

  

  function updateCameraOrbit() {
    // Update OrbitControls target to a point just in front of the camera
  
    var forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
  
    controls.target.copy(camera.position).add(forward);
  };

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update fireflies
   //firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})


/**
 * actual renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.domElement.addEventListener("click", onclick, true);



function playVid() {
    video.play();
  }
  
  function pauseVid() {
    video.pause();
  }
  


  var raycaster = new THREE.Raycaster();
function onclick(event) {

  console.log('hmmmmmmmm')
  var selectedObject;
  


  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  var  spots= new Array(carpet,sofa,tv,carpet1,dining_table,table,tvplane,tv_resetPlane,dining_resetPlane,sofa_resetPlane,table_resetPlane,play_Plane,pause_Plane,tvframe,tv_linkPlane,d_linkPlane,s_linkPlane,t_linkPlane,wplane)
 
  var intersects = raycaster.intersectObjects(spots,true);
  if (intersects.length > 0) {
    
    selectedObject = intersects[0];
    console.log(intersects[0])
console.log(raycaster)

     switch (intersects[0].object.name)
     {
       case "Sofa_Long2":{
          sofapos()
          if (tableset.visible===true){
            tableset.visible=false
          }
          if (diningset.visible===true){
            diningset.visible=false
          }

          if (tvset.visible===true){
            tvset.visible=false
          }

          pauseVid()
          // points[0].element.classList.add('visible')
          // points[1].element.classList.add('visible')
          
          //points[1].element.classList.add('visible')
       }break;

       case "Table_top":{
        tablepos()
        
       
        if (tvset.visible===true){
          tvset.visible=false
        }
        if (sofaset.visible===true){
          sofaset.visible=false
        }
        if (diningset.visible===true){
          diningset.visible=false
        }
        pauseVid()
        
      }break;
      case "Dining_table2":{
        table1pos()
        
        if (tvset.visible===true){
          tvset.visible=false
        }
        if (sofaset.visible===true){
          sofaset.visible=false
        }
        if (tableset.visible===true){
          tableset.visible=false
        }
        pauseVid()

      }break;
      case "tvscreen":{
        tvpos()
        playVid()
        if (sofaset.visible===true){
          sofaset.visible=false
        }
        if (tableset.visible===true){
          tableset.visible=false
        }
        if (diningset.visible===true){
          diningset.visible=false
        }
        
      }break;
      case "Frame":{
        tvpos()
        playVid()
        if (sofaset.visible===true){
          sofaset.visible=false
        }
        if (tableset.visible===true){
          tableset.visible=false
        }
        if (diningset.visible===true){
          diningset.visible=false
        }
      }break;

      case "resetButton":{
        console.log('why are you not running')
        //window.open("https://www.ikea.com/in/en/p/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey-s09216755/");
        startpos()
        // if(tvset,sofaset,diningset,tableset=== true){
        //   tvset,sofaset,diningset,tableset= true
        // }
        if (tvset.visible===true){
          tvset.visible=false
        }
        if (sofaset.visible===true){
          sofaset.visible=false
        }
        if (tableset.visible===true){
          tableset.visible=false
        }
        if (diningset.visible===true){
          diningset.visible=false
        }
        pauseVid()
      }break;

      case"play":{
        playVid()

      }break;
      case"pause":{
        pauseVid()
      }break;

      case"tvlink":{
        window.open("https://www.amazon.in/LG-inches-Ready-Smart-32LM563BPTC/dp/B08DPLCM6T/ref=asc_df_B08DPLCM6T/?tag=googleshopdes-21&linkCode=df0&hvadid=397009471135&hvpos=&hvnetw=g&hvrand=10296757745844622740&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9303484&hvtargid=pla-943807372525&ext_vrnc=hi&th=1");
      }break;

      
      case"dininglink":{
        window.open("https://www.ikea.com/in/en/p/moerbylanga-table-oak-veneer-brown-stained-70386249/");
      }break;

      
      case"sofalink":{
        window.open("https://www.ikea.com/in/en/p/ektorp-3-seat-sofa-with-chaise-longue-hallarp-grey-s09320078/");
      }break;
      
      case"tablelink":{
        window.open("https://www.decornation.in/product/elissa-coffee-table/");
      }break;
      default:{
        console.log(selectedObject)

    var newPos = new THREE.Vector3(selectedObject.point.x,camera.position.y,selectedObject.point.z);
    gsap.to( camera.position, {
      duration: 1.5,  
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      onUpdate: function () {
        camera.updateProjectionMatrix();
        updateCameraOrbit();
        //controls.update();
      },
      onComplete: ()=>{
        camera.updateProjectionMatrix();
        updateCameraOrbit();
        controls.update();
      }

    } );
      }

     }
    }
}



const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
   // composer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()