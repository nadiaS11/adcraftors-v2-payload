import * as migration_20260228_090924 from './20260228_090924';

export const migrations = [
  {
    up: migration_20260228_090924.up,
    down: migration_20260228_090924.down,
    name: '20260228_090924'
  },
];
