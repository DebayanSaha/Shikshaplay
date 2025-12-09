import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Neuron = () => {
  const { t } = useTranslation();
  const [autoRotate, setAutoRotate] = useState(true);
  const iframeRef = useRef(null);

  const handleMouseDown = () => {
    setAutoRotate(false);
    iframeRef.current?.contentWindow?.postMessage({ type: "autoRotate", value: false }, "*");
  };

  const handleMouseMove = (e) => {
    if (!autoRotate && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: "rotate",
        dx: e.movementX * 0.01,
        dy: e.movementY * 0.01,
      }, "*");
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setAutoRotate(true);
      iframeRef.current?.contentWindow?.postMessage({ type: "autoRotate", value: true }, "*");
    }, 2000);
  };

  const resetView = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "reset" }, "*");
    setAutoRotate(true);
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  * { margin: 0; padding: 0; }
  body { overflow: hidden; background: #0a0a1a; }
  canvas { width: 100vw; height: 100vh; display: block; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
  let scene, camera, renderer, neuron;
  window.autoRotate = true;

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    camera = new THREE.PerspectiveCamera(85, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, -5, 15);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); scene.add(ambientLight);
    const light1 = new THREE.DirectionalLight(0xff6b9d, 1); light1.position.set(5,5,5); scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x64b5f6, 0.8); light2.position.set(-5,3,-5); scene.add(light2);
    const pointLight = new THREE.PointLight(0xffd54f, 1.5, 50); pointLight.position.set(0,-5,5); scene.add(pointLight);

    neuron = new THREE.Group();
    window.neuron = neuron;

    const soma = new THREE.Mesh(
      new THREE.SphereGeometry(1.5,32,32),
      new THREE.MeshPhongMaterial({ color:0xff6b9d, emissive:0xff1744, emissiveIntensity:0.2, shininess:100, specular:0xffffff })
    );
    neuron.add(soma);

    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.8,32,32),
      new THREE.MeshPhongMaterial({ color:0x8b4789, emissive:0x4a148c, emissiveIntensity:0.3 })
    );
    neuron.add(nucleus);

    function createDendrite(start, dir, len, depth, rad, parentAngle) {
      if(depth>5||len<0.3) return;
      const pts=[]; const segs=6;
      for(let i=0;i<=segs;i++){
        const t=i/segs; const bend=Math.sin(t*Math.PI)*0.05;
        pts.push(new THREE.Vector3(
          start.x+dir.x*len*t+bend*Math.cos(parentAngle),
          start.y+dir.y*len*t,
          start.z+dir.z*len*t+bend*Math.sin(parentAngle)
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve,segs,rad,6,false),
        new THREE.MeshPhongMaterial({ color:0xff8fab, emissive:0xff4081, emissiveIntensity:0.15, shininess:60 })
      );
      neuron.add(tube);
      if(depth>=4||len<0.5){
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(rad*2,6,6),
          new THREE.MeshPhongMaterial({ color:0xff6b9d, emissive:0xe91e63, emissiveIntensity:0.3 })
        );
        bulb.position.copy(pts[pts.length-1]);
        neuron.add(bulb);
      }
      const end=pts[pts.length-1];
      if(depth<5){
        const branchAngle=0.4;
        for(let i=0;i<2;i++){
          const side=i===0?1:-1;
          const perpDir=new THREE.Vector3(-dir.y, dir.x, 0).normalize();
          const newDir=new THREE.Vector3(dir.x+perpDir.x*side*branchAngle, dir.y+perpDir.y*side*branchAngle, dir.z).normalize();
          createDendrite(end,newDir,len*0.7,depth+1,rad*0.7,parentAngle+side*0.3);
        }
      }
    }

    for(let i=0;i<8;i++){
      const ang=(Math.PI*2*i)/8;
      const elevation=Math.cos(i*0.7)*0.4;
      const dir=new THREE.Vector3(Math.cos(ang)*Math.cos(elevation), Math.sin(elevation), Math.sin(ang)*Math.cos(elevation)).normalize();
      const startPos=dir.clone().multiplyScalar(1.5);
      createDendrite(startPos,dir,1.8,0,0.12,ang);
    }

    const axonPts=[]; const axonLen=8;
    for(let i=0;i<=20;i++){ const t=i/20; axonPts.push(new THREE.Vector3(Math.sin(t*Math.PI)*0.2,-t*axonLen,Math.cos(t*Math.PI*2)*0.15)); }
    const axon = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(axonPts),20,0.15,8,false),
      new THREE.MeshPhongMaterial({ color:0xffa5c8, emissive:0xff6090, emissiveIntensity:0.1 })
    );
    neuron.add(axon);

    for(let i=0;i<4;i++){
      const myelin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25,0.25,1.2,8),
        new THREE.MeshPhongMaterial({ color:0xffd54f, emissive:0xffa000, emissiveIntensity:0.3 })
      );
      myelin.position.y = -1.5 - i*1.8;
      neuron.add(myelin);
    }

    for(let i=0;i<5;i++){
      const ang=(Math.PI*2*i)/5;
      const term = new THREE.Mesh(
        new THREE.SphereGeometry(0.2,8,8),
        new THREE.MeshPhongMaterial({ color:0xff6b9d, emissive:0xe91e63, emissiveIntensity:0.5 })
      );
      term.position.set(Math.cos(ang)*1, -axonLen-0.5, Math.sin(ang)*1);
      neuron.add(term);

      const connGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([axonPts[axonPts.length-1], term.position]), 5, 0.08, 6, false);
      const conn = new THREE.Mesh(connGeo, new THREE.MeshPhongMaterial({ color:0xff8fab, emissive:0xff4081, emissiveIntensity:0.2 }));
      neuron.add(conn);
    }

    neuron.rotation.x=0.3;
    scene.add(neuron);

    function animate(){
      requestAnimationFrame(animate);
      if(window.autoRotate && neuron){ neuron.rotation.y += 0.005; }
      renderer.render(scene,camera);
    }
    animate();

    window.addEventListener('resize',()=>{
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('message', (e)=>{
      const data=e.data;
      if(data.type==='autoRotate'){ window.autoRotate = data.value; }
      if(data.type==='rotate' && neuron){
        neuron.rotation.y += data.dx; neuron.rotation.x += data.dy;
      }
      if(data.type==='reset' && neuron){
        neuron.rotation.set(0.3,0,0); window.autoRotate = true;
      }
    });
  }

  init();
</script>
</body>
</html>
  `;

  return (
    <div className="relative flex flex-col h-screen bg-[#0a0a1a]">
      {/* Header */}
      <div className="pt-12 px-5 pb-5 bg-[#ff6b9d1a] border-b-2 border-[#ff6b9d] text-center">
        <h1 className="text-white text-3xl font-bold mb-1">{t('subjects.games.neuron.title')}</h1>
        <p className="text-pink-300 text-sm">{t('subjects.games.neuron.subtitle')}</p>
      </div>

      {/* 3D View */}
      <div
        className="flex-1"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <iframe
          ref={iframeRef}
          srcDoc={htmlContent}
          className="w-full h-full border-0"
          title="Neuron 3D"
        ></iframe>
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 left-5 bg-[#0a0a1a]/95 p-4 rounded-lg border border-[#ff6b9d] max-h-72 overflow-y-auto">
        <h2 className="text-white font-bold text-lg mb-2">{t('subjects.games.neuron.neuron_parts')}</h2>
        {[
          { color: '#ff6b9d', label: t('subjects.games.neuron.soma') },
          { color: '#8b4789', label: t('subjects.games.neuron.nucleus') },
          { color: '#ff8fab', label: t('subjects.games.neuron.dendrites') },
          { color: '#ffd54f', label: t('subjects.games.neuron.myelin_sheath') },
          { color: '#ffa5c8', label: t('subjects.games.neuron.axon') },
          { color: '#ff4081', label: t('subjects.games.neuron.axon_terminals') },
        ].map((item, i) => (
          <div key={i} className="flex items-center my-1">
            <div className="w-5 h-5 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
            <span className="text-white text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button
        className="absolute bottom-5 right-5 bg-pink-400 py-3 px-6 rounded-full shadow-lg shadow-pink-500/30 text-white font-bold"
        onClick={resetView}
      >
        {t('subjects.games.neuron.reset_view')}
      </button>
    </div>
  );
};

export default Neuron;
