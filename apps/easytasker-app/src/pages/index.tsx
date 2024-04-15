import styles from './index.module.css';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Hello World!</h1>
      <button onClick={() => alert('Button clicked!')}>Click Me</button>
      <Link href="/LoginPage">Login</Link>
    </div>
  );
};

export default IndexPage;
