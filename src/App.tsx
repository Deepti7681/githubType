import React, { createContext, FormEvent, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
/*import './App.css';
import { queryAllByAltText } from '@testing-library/dom';
import { IRecipe } from './IRecipe';
import Recipe from './RecipeComponent';
import RecipeComponent from './RecipeComponent';

function App() {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: String): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipesFound(response);
    })();
  }, [recipeSearch]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = '';
  };

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className="searchForm" onSubmit={event => search(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}
      <div className="recipes-container">
        {recipesFound.length &&
          recipesFound.map(recipe =>
            (<RecipeComponent key={recipe.href} recipe={recipe}></RecipeComponent>))
        }
      </div>
    </div>
  );
}

export default App;*/
import './App.css';
//import React, { FormEvent, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
//import { useRef } from 'React';
import RepositoriesList from './RepositoriesList';
import { IGitHubUser } from './interfaces/IGitHubUser';
import GistsList from './GistsList';
import FollowersList from './FollowersList';
import HookTimer from './HookTimer';
import CompC from './CompC'
import Demo from './Demo';
//import Abc from './Abc';

//import react,{createContext} from "React";
//import React, {  useRef } from 'react';
//import React , {useRef} from 'react';


 const UserContext = createContext("user");
 const ChannelContext = createContext("channel");
 function UseRefComponent() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return <input ref={inputRef} />;
}
function App() {
  //const FirstName = createContext();
  //const search= useRef(null);
  const [userSearch, setUserSearch] = useState<string>('');
  const [foundUser, setFoundUser] = useState<IGitHubUser>();


  useEffect(()=> {
    alert("Done")
   //search.current.focus()
  },[])

  const performSearchRequest = async () => {
    try {
      const response = await axios.get<IGitHubUser>(`https://api.github.com/users/${userSearch}`);
      setFoundUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchForUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performSearchRequest();
    //userSearch= useRef(null);
  }

  return (
    <div className="App">
     <Demo />
      <UserContext.Provider value={"Deepti"}>
        <ChannelContext.Provider value={"POC"}>
					<CompC />
				</ChannelContext.Provider>
			</UserContext.Provider>
      
      <HookTimer></HookTimer>
      <h1>GitHub Viewer</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {!foundUser && <span>Repositories</span>}
              {foundUser && <Link to="/repos">Repositories</Link>}
            </li>
            <li>
              {!foundUser && <span>Gists</span>}
              {foundUser && <Link to="/gists">Gists</Link>}
            </li>
            <li>
              {!foundUser && <span>Followers</span>}
              {foundUser && <Link to="/followers">Followers</Link>}
            </li>
          </ul>
        </nav>

        <main>
          <Switch>
            <Route exact path="/">
              <h2>Search for a user</h2>
              <form className="search-user" onSubmit={searchForUser}>
                <input value={userSearch}  onChange={event => setUserSearch(event.target.value)} placeholder="Enter a username..."/>
                <button>Search</button>
              </form>
              
              {foundUser && <div>
                <h3>{foundUser.login}</h3>
                <div className="user-details">
                  <div>
                    <p><strong>Name: </strong>{foundUser.name}</p>
                    <p><strong>Company: </strong>{foundUser.company}</p>
                    <p><strong>Location: </strong>{foundUser.location}</p>
                    <p><strong>Followers: </strong>{foundUser.followers}</p>
                  </div>
                 
                  <img src={foundUser.avatar_url} alt={foundUser.name} />
                </div>
              </div>
              }
            </Route>
            <Route path="/repos">
              <h2>Repositories</h2>
              {foundUser
                ? <RepositoriesList repositoriesUrl={foundUser.repos_url}></RepositoriesList>
                : <Redirect to="/"></Redirect>
              }
            </Route>
            <Route path="/gists">
              <h2>Gists</h2>
              {foundUser
                ? <GistsList gistsUrl={foundUser.gists_url}></GistsList>
                : <Redirect to="/"></Redirect>
              }
            </Route>
            <Route path="/followers">
              <h2>Followers</h2>
              {foundUser
                ? <FollowersList followersUrl={foundUser.followers_url}></FollowersList>
                : <Redirect to="/"></Redirect>
              }
            </Route>
          </Switch>
        </main>
      </Router>

    </div>
  );
}

export default App;
export {UserContext,ChannelContext,UseRefComponent};