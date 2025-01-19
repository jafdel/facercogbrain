import React, { Component } from "react";
import Navigation from './components/Navigation/Navigation.js';
import Rank from './components/Rank/Rank.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecog from './components/FaceRecog/FaceRecog.js';
import './App.css';
import { useCallback, useEffect, useMemo, useState, useReducer } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Clarifai from 'clarifai';
import axios from 'axios';
import cors from 'cors';
//import 'https://astica.ai/javascript-sdk/2024-01-31/astica.api.js';
//import vision from 'google-cloud/vision';
//import { createProxyMiddleware } from 'http-proxy-middleware';
//import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';
/*import service, { V2Client } from 'clarifai-nodejs-grpc/proto/clarifai/api/service_grpc_pb';
import resources from 'clarifai-noedejs-grpc/proto/clarifai_api_resources_pb';
import { StatusCode } from 'clarifai-nodejs-grpc-proto/clarifai/status_code_pb';*/

const App = () => {
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '1239eeb29be94cceb30a2024f4d050a9';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  // To use image bytes, assign its variable   
  
  /*const api = new Clarifai.App({
    apiKey: PAT
  });
  api.models.predict(Clarifai.FACE_DETECT_MODEL, IMAGE_URL)
    .then(
      function(response) {
        console.log(response)
      }
      , function(err) {
        console.log(err);
      }
  );*/
  
  // const IMAGE_BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

  //const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

  /*const stub = ClarifaiStub.grpc();

  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);

  stub.PostModelOutputs(
      {
          user_app_id: {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          model_id: MODEL_ID,
          version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
          inputs: [
              { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
          ]
      },
      metadata,
      (err, response) => {
          if (err) {
              throw new Error(err);
          }

          if (response.status.code !== 10000) {
              throw new Error("Post model outputs failed, status: " + response.status.description);
          }

          // Since we have one input, one output will exist here
          const output = response.outputs[0];

          console.log("Predicted concepts:");
          for (const concept of output.data.concepts) {
              console.log(concept.name + " " + concept.value);
          }
      }

  );*/

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  /*const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                      // "base64": IMAGE_BYTES_STRING
                  }
              }
          }
      ]
  });*/
  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  /*fetch(url, requestOptions).then(response => response.json()).then(result => {
          const regions = result.outputs[0].data.regions;
          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);

              region.data.concepts.forEach(concept => {
                  // Accessing and rounding the concept value
                  const name = concept.name;
                  const value = concept.value.toFixed(4);

                  console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
              });
          });
      });*//*.catch(error => console.log('error', error));*/

  /*const quickstart = async function() {
    const client = new vision.ImageAnnotatorClient({
    });
    keyFilename: '447603-j1-5fd01ef044b5.json'
    const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description))
    .catch(err => console.error("ERROR:", err));
  }
  quickstart();*/
  const [init, setInit] = useState(false);
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('none');
  //const [imgUrl, setImgUrl] = useState('');
  const forceUpdate = useReducer(x => x + 1, 0)[1];
  
  const onInputChange = event => {
    setInput(event.target.value);
    console.log(event.target.value);
  };

  const onButtonSubmit = e => {
    e.preventDefault();
    //e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.src = input;
    //const IMAGE_URL = 'https://astica.ai/example/asticaVision_sample.jpg';
    const url = 'https://vision.astica.ai/describe';
  
    const body = {
      tkn: '36163AEA-3AA5-4FFE-80B9-0FFDF88E0AAC6904552CD17986-93D2-4671-81D4-E8C94E826768',
      modelVersion: '2.5_full',
      input: input,
      visionParams: 'color',
      gpt_prompt: '',
    }
    const requestOptions = {
        method: 'POST',
        url: url,
        //origin: 'jafdel.github.io',
        //credentials: 'include',
        //withCredentials: true,
        mode: 'cors',
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + PAT
        },
        data: body
    };
    axios(requestOptions).then(response => console.log(response.data)).catch(err => console.log("ERROR:", err));
    setDisplay('block');
  };

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
    return (
      <div className="App">
        <Particles
              id="tsparticles"
              init={initParticlesEngine}
              loaded={particlesLoaded}
              options={options}
          />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecog input={input} display={display} />
      </div>
    );
  }
}

export default App;
