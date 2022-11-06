import React from 'react';

import styles from './Styles.module.scss';

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
    </div>
  );
}
