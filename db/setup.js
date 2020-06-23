const client = require('./db.js');
const sampleItems = require('./sample-data');

const databaseDefinition = { id: 'stocksdb' };
const collectionDefinition = { id: 'stocks' };

const setupAndSeedDatabase = async() => {
  const { database: db } = await client.databases.createIfNotExists(databaseDefinition);
  console.log('Database created.');

  const { container } = await db.containers.createIfNotExists(collectionDefinition);
  console.log('Collection created.');

  sampleItems.forEach(async(item) => {
    await container.items.create(item);
  });

  console.log('Seed data added.');
};

setupAndSeedDatabase().catch((err) => {
  console.error('Error setting up database:', err);
});
