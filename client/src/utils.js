export function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const error = `Error fetching books ${response.status} ${response.statusText}`;
    console.log(error); // eslint-disable-line
    throw new Error(error);
  }
}

export function parseJSON(response) {
  return response.json();
}
