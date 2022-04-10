import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NO_IMAGES_MESSAGE, NO_BREED_MESSAGE, NO_IMAGE_COUNT_MESSAGE } from 'Utils/Constants';
import { breeds, images } from './utils/data';
import App from '../App';

const setup = () =>{
  const utils = render(<App />);

  return {
    ...utils,
  };
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(breeds)
  })
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders learn react link', async () => {
  await act(async () => setup());
  expect(await screen.findByText(NO_IMAGES_MESSAGE)).toBeInTheDocument();
});

test('validation works', async () => {
  await act(async () => setup());

  fireEvent.click(screen.getByRole('button', {name: /Search/i}));

  await waitFor(() => {
    expect(screen.getByText(NO_BREED_MESSAGE)).toBeInTheDocument();
  })
  expect(screen.getByText(NO_IMAGE_COUNT_MESSAGE)).toBeInTheDocument();
});

test('api call works', async () => {
  await act(async () => setup());

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/breed/), { target: { value: 'australian' }});
    fireEvent.change(screen.getByLabelText(/subBreed/), { target: { value: 'shepherd' }});
    fireEvent.change(screen.getByLabelText(/imageCount/), { target: { value: 4 }});
  });

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(images)
  })

  fireEvent.click(screen.getByRole('button', {name: /Search/i}));

  let imageElements = null

  await waitFor(() => {
    imageElements = screen.getAllByRole('img');
    expect(imageElements.length).toEqual(4);
  })
  expect(imageElements[0]).toHaveAttribute('src', 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg');
});

