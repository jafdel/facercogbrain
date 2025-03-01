import React, { useEffect, useMemo, useState } from "react";
import Navigation from 'components/Navigation/Navigation.js';
import Rank from 'components/Rank/Rank.js';
import Logo from 'components/Logo/Logo.js';
import ImageLinkForm from 'components/ImageLinkForm/ImageLinkForm.js';
import SignIn from 'components/SignIn/SignIn.js';
import Register from 'components/Register/Register.js';
import FaceRecog from 'components/FaceRecog/FaceRecog.js';
import 'App.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const App = () => {  
  const [input, setInput] = useState(null);
  const [init, setInit] = useState(false);
  const [display, setDisplay] = useState('none');
  const [box, setBox] = useState({responses: [{faceAnnotations: []}]});
  const [route, setRoute] = useState('signIn');
  const [isIn, setIsIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: null
  });

  const loadUser = user => {
    setUser(user);
  }

  const onRouteChange = route => {
    if (route === 'signIn') {
      setIsIn(false);
      setDisplay('none');
      setInput(null);
    } else if (route === 'home') {
      setIsIn(true);
    }
    setRoute(route);
  };

  const onInputChange = event => {
    event.preventDefault();
    setInput(event.target.value);
    setDisplay('none');
    console.log(event.target.value);
  };

  const onButtonSubmit = e => {
    setDisplay('none');
  
    fetch("https://facerecogbrain-express.onrender.com/imageUrl", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input })
    }).then(result => result.json()).then(data => {
      if (data) {
        setBox(data);
        console.log(box);
        fetch('https://facerecogbrain-express.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id })
        }).then(response => response.json()).then(count => {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            entries: count,
            joined: user.joined
          });
        }).catch(err => console.log);
      }
    }).catch(err => console.log("err: ", err));
        setDisplay('block');
  };

function main(requests) {  
  async function callAsyncBatchAnnotateFiles() {
    // Construct request
    const request = {
      requests,
    };
  }
  callAsyncBatchAnnotateFiles();
  // [END vision_v1_generated_ImageAnnotator_AsyncBatchAnnotateFiles_async]
  }
  process.on('unhandledRejection', err => {
    console.error(err.message);
    process.exitCode = 1;
  });

    // this should be run only once per application lifetime
    useEffect(() => {
    initParticlesEngine(async engine => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => setInit(true));
  }, []);
  const particlesLoaded = container => console.log(container);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "rgb(0, 0, 0)",
        },
        opacity: 0
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 50,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
          opacity: 1
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 400,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 1 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    console.log(user);
    return (
      <div className="App">
        <Particles
              id="tsparticles"
              init={initParticlesEngine}
              loaded={particlesLoaded}
              options={options}
          />
          <Navigation onRouteChange={onRouteChange} isIn={isIn} />
          {
            route === 'home'
            ? <div>
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                <FaceRecog input={input} display={display} box={box} />
            </div>
            : (
              route === 'signIn'
              ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
              : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            )
          }
      </div>
    );
  }
}

export default App;
