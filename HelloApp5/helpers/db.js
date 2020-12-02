import SQLite from 'react-native-sqlite-storage';

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

const createTable  = async () => {
    let result = await ExecuteQuery('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)', []);
    console.log('Table Creation => ' + result);
}

const insertRow = async (params) => {
    let singleInsert = await ExecuteQuery('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)', params);
    return singleInsert;
}

const selectRows = async () => {
    let selectQuery = await ExecuteQuery( 'SELECT * FROM places', []);
    return selectQuery;
}

export const init = () => {
    SQLite.DEBUG(true);
    createTable();
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    return insertRow([title, imageUri, address, lat, lng]);
};

export const fetchPlaces = () => {
    return selectRows();
};