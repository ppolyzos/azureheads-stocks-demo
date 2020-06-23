const client = require('./db.js');

const databaseDefinition = { id: 'stocksdb' };
const collectionDefinition = { id: 'stocks' };

const init = async() => {
  const { database } = await client.databases.createIfNotExists(databaseDefinition);
  const { container } = await database.containers.createIfNotExists(collectionDefinition);
  return { database, container };
};

const getPriceChange = () => {
  const min = 100;
  const max = 999;
  const change = min + Math.random() * (max - min);
  return parseFloat((change / 100).toFixed(2));
};

const getStockChangeValues = (existingStock) => {
  const isChangePositive = !(existingStock.changeDirection === '+');
  const change = getPriceChange();
  let price = isChangePositive ? parseFloat(existingStock.price) + change : parseFloat(existingStock.price) - change;
  price = parseFloat(price.toFixed(2));
  return {
    price: price,
    change: change,
    changeDirection: isChangePositive ? '+' : '-',
  };
};

const fetchResources = async() => {
  const { container } = await init();

  const { resources: items } = await container.items
    .query({
      query: 'SELECT c.id from c',
    })
    .fetchAll();

  return { container, items };
};

const updateOnce = async() => {
  const { container, items } = await fetchResources();
  items.forEach(async({ id }) => {
    const randomTimeout = Math.round(Math.random() * 2000);
    setTimeout(async() => {
      await updateItem(container, id);
    }, randomTimeout);
  });
};

const updateContiously = async() => {
  const { container, items } = await fetchResources();

  items.forEach(async({ id }) => {
    const randomTimeout = Math.round(Math.random() * 10000);
    setInterval(async() => {
      await updateItem(container, id);
    }, randomTimeout);
  });
};

const updateItem = async(container, itemId) => {
  const doc = await container.item(itemId);

  const { resource: item } = await doc.read();

  const updates = getStockChangeValues(item);

  Object.assign(item, updates);

  await doc.replace(item);

  console.log(`Data updated: ${JSON.stringify(item)}`);
};

const getArgv = (param) => {
  const paramName = `--${param}=`;
  return (process.argv.slice(2).find((c) => c.startsWith(paramName)) || '').replace(paramName, '');
};

const mode = getArgv('mode') === 'once' ? updateOnce : updateContiously;
mode.call(this).catch((err) => {
  console.error(err);
});
