import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  // Toggle for Radio Buttons
  const isShowsSearch = searchOption === 'shows';

  // Input for Search bar
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  // Call the API to get results to the MISC Folders -> Config
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };
  // IMPORTANT Search options above is an API switch



  // If someone hits the enter button instead of clicking
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  // Render function for results
  const renderResults = () => {
    // Case one no results
    if (results && results.length === 0) {
      return <div> No Results </div>;
    }
    // case 2 map all the results 
    if (results && results.length > 0) {
      return results[0].show ?
           results.map(item => (
                         <div key={item.show.id}> {item.show.name} </div>
          ))
          : results.map(item => (
            <div key={item.person.id}> {item.person.name} </div>
          ))
    }
    // case 3 fall back
    return null;
  };


  // RADIO BUTTONS 
  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  }

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input type="radio" id="shows-search" value="shows" onChange={onRadioChange} checked={isShowsSearch} />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input type="radio" id="actors-search" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
