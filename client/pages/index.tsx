import type { NextPage } from 'next';
import SearchBar from '../components/search-bar';

const HomePage: NextPage = () => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <SearchBar />
    </div>
  );
};

export default HomePage;
