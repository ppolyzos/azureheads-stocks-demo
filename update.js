const client = require('./db.js');
const sampleItems = require('./db/items');

const databaseDefinition = { id: "stocksdb" };
const collectionDefinition = { id: "stocks" };

const init = async () => {
  const { database } = await client.databases.createIfNotExists(databaseDefinition);
  const { container } = await database.containers.createIfNotExists(collectionDefinition);
  return { database, container };
}

const getPriceChange = () => {
  const min = 100;
  const max = 999;
  const change = min + (Math.random() * (max - min));
  return parseFloat((change / 100).toFixed(2));
}

const getStockChangeValues = (existingStock) => {
  const isChangePositive = !(existingStock.changeDirection === '+');
  const change = getPriceChange();
  let price = isChangePositive ? parseFloat(existingStock.price) + change : parseFloat(existingStock.price) - change;
  price = parseFloat(price.toFixed(2));
  return {
    "price": price,
    "change": change,
    "changeDirection": isChangePositive ? '+' : '-'
  };
};


const updateData = async ()  => {
  const { container } = await init();

  sampleItems.forEach(async ({ id }) => {
    const randomTimeout = Math.round(Math.random() * 500);
    setTimeout(async () => {
      await updateItem(container, id);
    }, randomTimeout);
  });  
};

const updateItem = async (container, itemId) => {
  console.log('Read data from database.\n\n');
  const doc = await container.item(itemId);

  const { resource: existingStock } = await doc.read();

  const updates = getStockChangeValues(existingStock);

  Object.assign(existingStock, updates);

  await doc.replace(existingStock);

  console.log(`Data updated: ${JSON.stringify(existingStock)}`);
}

updateData().catch(err => {
  console.error(err);
});
