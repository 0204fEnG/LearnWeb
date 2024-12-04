import './App.css';
import Banner from './components/Banner/Banner'
import SearchBox from './components/SearchBox/SearchBox';
function App() {
  return (
    <div className='app'>
      <header className='app__header'>
        <SearchBox/>
        <Banner videoUrl='/videos/x5.mp4' title="欢迎来到我的网站" text="这个网站的服务内容包含如下:hello!"/>
      </header>
      <main className='app__main'>
      </main>
      <footer className='app__footer'></footer>
    </div>
  );
}

export default App;
