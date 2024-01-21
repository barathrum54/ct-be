import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the URL of the current module to a file path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assuming the file is located in the 'constants' directory relative to this script
const filePath = path.join(__dirname, '../constants/proxies.txt');

export const getRandomProxy = async () => {
  console.log('Getting a random proxy');

  // Read file content synchronously
  const data = fs.readFileSync(filePath, 'utf8');

  // Split the content by new line and filter out any empty lines
  let proxiesArray = data.split('\n').filter(proxy => proxy.trim() !== '');
  proxiesArray = proxiesArray.map(proxy => proxy.replace('\r', ''));
  // Get a random proxy
  const randomIndex = Math.floor(Math.random() * proxiesArray.length);
  console.log('Random index', proxiesArray[0]);
  return proxiesArray[0];
}
