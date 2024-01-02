import { default as sqlite3InitModule } from '/vite-react-javascript/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3-bundler-friendly.mjs';
import '/vite-react-javascript/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3-worker1-promiser-bundler-friendly.js';

const sqlite3Worker1Promiser = self.sqlite3Worker1Promiser;

export default sqlite3InitModule;
export { sqlite3Worker1Promiser };
