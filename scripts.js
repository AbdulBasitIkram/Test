var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
camera.position.z = 50;



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

// soft white lightvar light = new THREE.AmbientLight( 0x404040 ); 
// soft white light scene.add( light );
  
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
mtlLoader.setPath('/examples/3d-obj-loader/assets/');
mtlLoader.load('SWORDS.mtl', function (materials) {

    materials.preload();
	
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('SWORDS.obj', function (object) {

        scene.add(object);
        
		object.position.y -= 65;
			
  					object.traverse( function ( child ) {
					if ( child instanceof THREE.Object3D  ) {
						// console.log(child.name +"test");

    					console.log("~ materials ~");
						console.log(child.material);
						//console.log(child);
						//console.log(object);
						
					if(child.name==='010001_Autoscale'){
						alert("010001_Autoscale");
						child.material.color.setHex(0xffff00);
						
						
					}
					}
				} );

});
});


var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};
	
animate();
 /*
 var loader = new THREE.JSONLoader();

// load a resource
loader.load(
	// resource URL
	'/examples/3d-obj-loader/assets/app.json',

	// onLoad callback
	function ( geometry, materials ) {
		var material = materials[ 0 ];
		var object = new THREE.Mesh( geometry, material );
		scene.add( object );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function( err ) {
		console.log( 'An error happened' );
	}
);
var material = new THREE.MeshPhongMaterial({
	color: 0xfff212,
	emissive: 0xfff212,
});
*/

