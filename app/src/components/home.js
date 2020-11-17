import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Product from "./product";

// import { electronConfig } from '../../main';

import "../styles/main.css";
import "react-image-gallery/styles/css/image-gallery.css";

class home extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:3501", // this is where we are connecting to with sockets
      change: false,
      cec: {},
      config: {},
      multimedia: [],
      domain: "atacadogames",
      group: "default",
      urlBase: "http://192.168.220.191:8000",
      // urlBase: 'http://192.168.10.40:8000',
      timer: 0
    };
  }

  async componentWillMount() {
    let config = await axios
      .get(`${this.state.urlBase}/ads_group_slides`)
      .then(response => {
        return response.data[0];
      })
      .catch(e => console.log("!!!!" + e));
    let group = await axios
      .get(
        `${this.state.urlBase}/ads/${this.state.domain}/${this.state.group}/slides`
      )
      .then(response => response.data)
      .catch(e => console.log("!!!!" + e));

    let multimedia = [];
    for (let i = 0; i < group.length; i++) {
      if (group[i].is_use) {
        multimedia.push({
          original: group[i].url,
          thumbnail: group[i].url
        });
      }
    }

    this.setState({
      config,
      group,
      multimedia
    });
  }

  async componentDidMount() {
    async function getNewMultimedia(data, urlBase) {
      let group = await axios
        .get(`${urlBase}/ads/${data.domain}/${data.group}/slides`)
        .then(response => response.data)
        .catch(e => console.log("!!!!" + e));
      let multimedia = [];
      for (let i = 0; i < group.length; i++) {
        if (group[i].is_use) {
          multimedia.push({
            original: group[i].url,
            thumbnail: group[i].url
          });
        }
      }
      return multimedia;
    }

    async function getConfig(data, group) {
      let config = await axios
        .get(`${data}/ads_group_slides`)
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].group_name === group) {
              return response.data[i];
            }
          }
        })
        .catch(e => console.log("!!!!" + e));
      return config;
    }

    const socket = socketIOClient(this.state.endpoint);
    socket.on("change cec", async cec => {
      let multimedia = [];
      let config;

      if (this.state.domain !== cec.domain && this.state.group !== cec.group) {
        let data = { domain: cec.domain, group: cec.group };
        multimedia = await getNewMultimedia(data, cec.urlBase);
      } else if (this.state.domain !== cec.domain) {
        let data = { domain: cec.domain, group: this.state.group };
        multimedia = await getNewMultimedia(data, cec.urlBase);
      } else if (this.state.group !== cec.group) {
        let data = { domain: this.state.domain, group: cec.group };
        multimedia = await getNewMultimedia(data, cec.urlBase);
      } else {
        let data = { domain: this.state.domain, group: this.state.group };
        multimedia = await getNewMultimedia(data, cec.urlBase);
      }

      config = await getConfig(cec.urlBase, cec.group);

      this.setState({ cec, change: true, multimedia, config, timer: 0 });
    });

    this.interval = setInterval(() => {
      if (this.state.timer <= this.state.config.spend_time) {
        if (this.state.timer === this.state.config.spend_time) {
          this.setState({ timer: 0, change: false });
        }
      }

      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.state.change ? (
          <Product cec={this.state.cec} />
        ) : Object.keys(this.state.multimedia)[0] !== undefined ? (
          <div className='container-slider-principal'>
            <ImageGallery
              items={this.state.multimedia}
              showThumbnails={false}
              showNav={false}
              showFullscreenButton={false}
              useBrowserFullscreen={true}
              showPlayButton={false}
              showBullets={false}
              autoPlay={true}
              slideDuration={300}
            />
          </div>
        ) : (
          <div className='container-slider-principal'>
            <ImageGallery
              items={[
                {
                  original:
                    "https://res.cloudinary.com/gametec/image/upload/indisponivel.webp",
                  thumbnail:
                    "https://res.cloudinary.com/gametec/image/upload/indisponivel.webp"
                }
              ]}
              showThumbnails={false}
              showNav={false}
              showFullscreenButton={false}
              useBrowserFullscreen={true}
              showPlayButton={false}
              showBullets={false}
              autoPlay={true}
              slideDuration={300}
            />
          </div>
        )}
      </div>
    );
  }
}

export default home;
