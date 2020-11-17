import React, { Component } from "react";

import ImageGallery from "react-image-gallery";

import "../styles/product.css";

class Product extends Component {
  intervalID = 0;

  transformArray(array) {
    var newArray = [];
    var arrayOfThree = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "feature_name") {
        null;
      } else {
        arrayOfThree.push(array[i]);
        if (arrayOfThree.length === 4) {
          newArray.push(arrayOfThree);
          arrayOfThree = [];
        }
      }
    }
    return newArray;
  }

  componentDidMount() {
    function ScrollDiv() {
      if (document.getElementById("details")) {
        if (
          document.getElementById("details").scrollTop <
          document.getElementById("details").scrollHeight -
            document.getElementById("details").offsetHeight
        ) {
          -1;
          document.getElementById("details").scrollTop =
            document.getElementById("details").scrollTop + 1;
        } else {
          document.getElementById("details").scrollTop = 0;
        }
      }
    }

     this.intervalID =  setInterval(ScrollDiv, 70);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    let { cec } = this.props;
    const keys = cec.product_meta
      ? Object.keys(cec.product_meta.featured_details)
      : [];

    return (
      <div className='text-center'>
        {keys.length > 0 ? (
          <section className='product row'>
            <div className='product__photo col-7'>
              <div className='photo-container'>
                <ImageGallery
                  items={cec.images}
                  showThumbnails={false}
                  showNav={false}
                  showFullscreenButton={false}
                  useBrowserFullscreen={true}
                  useBrowserFullscreen={true}
                  showPlayButton={false}
                  showBullets={false}
                  autoPlay={true}
                  slideDuration={500}
                />
              </div>
            </div>

            <div className='product__info text-left col-5'>
              <div className='title mt-3'>
                <h1>{cec.name_in_site}</h1>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-6 px-0'>
                      <span className='cec'>COD: {cec.cod_cec}</span>
                    </div>
                    {/* <div className="col-6 price">
                      U$S <span>{cec.fist_price}</span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className='details col-12 px-0 mt-2' id='details'>
                <table className='mt-5'>
                  <tbody>
                    {keys.map(key => {
                      if (key === "feature_name") {
                        null;
                      } else {
                        return (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{cec.product_meta.featured_details[key]}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <section className='product2'>
            <div className='container-products-titles'>
              <div className='title mt-3'>
                <h1>{cec.name_in_site}</h1>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-6 px-0'>
                      <span className='cec'>COD: {cec.cod_cec}</span>
                    </div>
                    {/* <div className="col-6 price">
                      U$S <span>{cec.fist_price}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='photo-container2'>
              {cec.images.length === 0 ? (
                <img
                  width='550'
                  src='https://res.cloudinary.com/gametecgroup/image/upload/c_fill,f_auto,h_500,w_500/v1543507536/indisponivel.jpg'
                />
              ) : (
                <ImageGallery
                  additionalClass='photo-container-child'
                  items={cec.images}
                  showThumbnails={false}
                  showNav={false}
                  showFullscreenButton={false}
                  useBrowserFullscreen={true}
                  useBrowserFullscreen={true}
                  showPlayButton={false}
                  showBullets={false}
                  autoPlay={true}
                  slideDuration={500}
                />
              )}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Product;
