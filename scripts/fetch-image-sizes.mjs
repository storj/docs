import fs from 'fs'

const URL = 'https://link.storjshare.io/raw/jwj4kunevnoktpwxxyj6yjlrfhra/docs/image-size-cache.json';
const FILE_PATH = '.image-size-cache.json';

async function fetchDataAndSave() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.text();

    fs.writeFileSync(FILE_PATH, data);
    console.log(`Data saved to ${FILE_PATH}`);
  } catch (error) {
    console.error('Error fetching data and saving to file:', error.message);
  }
}

fetchDataAndSave();
