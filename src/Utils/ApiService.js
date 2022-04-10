export const fetchBreeds = async () => {
  const response = await fetch(`${process.env.REACT_APP_DOG_CEO_URL}breeds/list/all`)
  return await response.json()
}

export const fetchImagesByBreed = async ({ breed, subBreed, imageCount }) => {
  if (subBreed) {
    return fetchImagesBySubBreed({ breed, subBreed, imageCount })
  }

  const response = await fetch(`${process.env.REACT_APP_DOG_CEO_URL}breed/${breed}/images/random/${imageCount}`)
  return await response.json()
}

export const fetchImagesBySubBreed = async ({ breed, subBreed, imageCount }) => {
  const response = await fetch(`${process.env.REACT_APP_DOG_CEO_URL}breed/${breed}/${subBreed}/images/random/${imageCount}`)
  return await response.json()
}