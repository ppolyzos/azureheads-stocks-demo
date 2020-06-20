const { v4: uuidv4 } = require('uuid');

const makeSymbol = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateRandomItems = (totalItems) => {
  const sampleItems = [];
  for (var i = 0; i < totalItems; i++) {
    sampleItems.push({
      id: uuidv4(),
      symbol: makeSymbol(3),
      price: Math.round(Math.random() * 10000) / 100,
      change: Math.round(Math.random() * 1000) / 100,
      changeDirection: Math.round() > 0.5 ? '+' : '-'
    });
  }
  return sampleItems;
}

const itemsToMake = 12;
const sampleItems = generateRandomItems(itemsToMake);

module.exports = sampleItems;
