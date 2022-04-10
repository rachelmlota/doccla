import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Filter from 'Components/Filter';
import { BREED, SUB_BREED, IMAGE_COUNT } from 'Utils/Constants';
import Images from 'Components/Images';
import Nav from 'Components/Nav';
import { fetchBreeds , fetchImagesByBreed} from 'Utils/ApiService'

function App() {

  const dataObj = {
    [BREED]: '',
    [SUB_BREED]: '',
    [IMAGE_COUNT]: '',
  }

  const apiDataObj = {
    data: [],
    breeds: [],
    subBreeds: [],
  }

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(dataObj);
  const [apiData, setApiData] = useState(apiDataObj);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchBreeds()
      .then(data => setApiData({
        ...apiData,
        data: data.message,
        breeds: Object.keys(data.message),
      })
      // .catch(err => {
      //   console.error(err)
      //   setApiData(apiDataObj)
      // })
    )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === BREED && value !== '') {
      setFormData({ 
        ...formData, 
        [BREED]: value,
        [SUB_BREED]: '' 
      });

      setApiData({
        ...apiData,
        subBreeds: apiData.data[value],
      })

      return;
    }

    setFormData({ 
      ...formData, 
      [name]: value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      await fetchImagesByBreed(formData)
              .then(data => setImages(data.message || []))
              .catch(() => {
                setImages([])
              })
    } 

    e.stopPropagation();
    setValidated(true);    
  }

  return (
    <Container>
      <Nav />
      <Filter apiData={apiData} onSubmit={onSubmit} formData={formData} validated={validated} handleChange={handleChange} />
      <Images images={images} />
    </Container>
  );
}

export default App;
