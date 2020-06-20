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


const updateIntervals = async () => {
  const { container } = await init();

  console.log('Read data from database.\n\n');
  sampleItems.forEach(async ({ id }) => {
    const randomTimeout = Math.round(Math.random() * 3000);
    setInterval(async () => {
      await updateItem(container, id);
    }, randomTimeout);
  });  
}

const updateItem = async (container, itemId) => {
  
  const doc = await container.item(itemId);

  const { resource: item } = await doc.read();

  const updates = getStockChangeValues(item);

  Object.assign(item, updates);

  await doc.replace(item);

  console.log(`Data updated: ${JSON.stringify(item)}`);
}

const getArgv = (param) => {
  const paramName = `--${param}=`;
  return (process.argv.slice(2).find(c => c.startsWith(paramName)) || '')
    .replace(paramName, '');
}

const mode = getArgv('mode') === 'once' ? updateData : updateIntervals;
mode.call(this).catch(err => {
  console.error(err);
});
