import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to database...');
  })
  .catch((error) => console.log(error));
