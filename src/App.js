import './App.css';
import Header from './components/Header.js';
import Stories from './components/Stories.js';
import User_Post from './components/User_Post.js';
import Posts from './components/Posts.js';

import {useState, useEffect} from 'react';
import {db, auth} from './firebase'; 

function App() {

    const[user_login,set_user_login] = useState({});

    useEffect(()=>{
        auth.onAuthStateChanged((val)=>{
            if(val != null){
                set_user_login(val);
            }
        })
    },[]);


    return (
        <div className="App">
            <Header user_login={user_login} set_user_login={set_user_login}/>
            <Stories/>
            {
                (user_login)?
                <div>
                    <User_Post user_login={user_login}/>
                    <Posts user_login={user_login}/>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default App;
