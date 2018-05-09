import db from './database';

export default {
  createDb
};

async function createDb() {
  try {
    await db.init();
    console.log('DB was seeded!');
  } catch (err) {
    console.error(`Data Seed error`);
    console.log(`Check DB config values. Create DB if not exists.`);
    console.log(`Error: ${err}`);
  }
}
