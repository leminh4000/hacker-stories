import './App.css';
import * as React from 'react';



const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState);
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value,key]);
    return [value, setValue];
  }
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');

  console.log(searchTerm);
  console.log(typeof searchTerm);



  const handleSearch = (event) => {
    //console.log("from App "+event.target.value);
    setSearchTerm(event.target.value);
    //localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter(story => (story.title.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />

      <List list={searchedStories} />

    </div>

  );
}

const Search = ({ search, onSearch }) => {
  //const [searchTerm, setSearchTerm] =React.useState('');
  /* const handleChange = (event) => {
    setSearchTerm(event.target.value);

    props.onSearch(event);
  } */
  //const {search, onSearch} = props;
  return (<div>
    <label htmlFor="search">Search:</label>
    <input id="search"
      type="text"
      value={search}
      onChange={onSearch} />

    {/* <p>
      Searching for <strong>{searchTerm}</strong>
    </p> */}
  </div>);
}

const List = ({ list }) => {
  //console.log('List renders');
  return <ul>
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>;
}


const Item = (
  {
    title,
    url,
    author,
    num_comments,
    points,
  }
) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);
export default App;


