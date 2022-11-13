import styles from './Styles.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
    </div>
  );
};

export default NotFoundBlock;
