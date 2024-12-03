import './App.css';
import Banner from './components/Banner/Banner'
function App() {
  return (
    <div className='app'>
      <header className='app__header'>
        <Banner videoUrl='/videos/next.mp4'/>
      </header>
      <main className='app__main'>
      </main>
      <footer className='app__footer'></footer>
    </div>
  );
}

export default App;
