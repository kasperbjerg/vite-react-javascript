import { useState } from 'react';
import { useEffect } from 'react';
import sqlite3InitModule from './index.mjs';

export default function Sql() {

  const [resultRows, setResultRows] = useState([]);
  const container = document.querySelector('.main-thread');
  
  useEffect(() => {

    

    const start = function (sqlite3) {
      console.log('Running SQLite3 version', sqlite3.version.libVersion);
      const db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
      console.log('Created transient database', db.filename);

      try {
        console.log('', 'Creating a table...');
        db.exec('DROP TABLE IF EXISTS t');
        db.exec('CREATE TABLE IF NOT EXISTS t(navn TEXT, antal INTEGER)');
        db.exec({
          sql: 'INSERT INTO t(navn,antal) VALUES (?,?)',
          bind: ["Nutella", 2],
        });

        db.exec({
          sql: 'INSERT INTO t(navn,antal) VALUES (?,?)',
          bind: ["Smør", 3],
        });
        
        console.log('Query data with exec()...');
        db.exec({
          sql: 'SELECT navn,antal FROM t ORDER BY antal',
          callback: (result) => {
            setResultRows(resultRows => [...resultRows, JSON.stringify(result)]);
          },
        });
      } finally {
        db.close();
      }
    };

    console.log('Loading and initializing SQLite3 module...');
    sqlite3InitModule({
      //print: log,
      //printErr: error,
    }).then((sqlite3) => {
      console.log('Done initializing. Running demo...');
      try {
        start(sqlite3);
      } catch (err) {
        error(err.name, err.message);
      }
    });
  }, []);
  
  return (
    <div>
      <h1>Database</h1>
      <h1>{resultRows}</h1>
    </div>
  );
}