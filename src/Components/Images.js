import React from 'react';
import { Alert, Image } from 'react-bootstrap';
import Masonry from 'react-masonry-css'
import { NO_IMAGES_MESSAGE } from 'Utils/Constants';
import './Images.css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Images = ({images}) => {
  if (images.length === 0) {
    return <Alert variant={`info`}>
      {NO_IMAGES_MESSAGE}
    </Alert>
  } 

  return <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
    { images.map((image, idx) =>  <Image className="w-100 mb-4" key={idx} src={image} fluid /> )}
  </Masonry>
}

export default Images;