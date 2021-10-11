import Post_Single from "./Posts_Single.js";
import {auth,db} from '../firebase.js';
import {useState,useEffect} from 'react';
import user from '../resources/flavio.png';

export default function(props){
    const [new_posts,set_new_posts] = useState([]);
    
    useEffect(() =>{
        db.collection('posts').orderBy('post_time','desc').onSnapshot(fetchPost =>{
            set_new_posts(fetchPost.docs.map(doc=>{
                return {info:doc.data()};
            }));
        });
    },[]);


    function handle_time(time){
        let date = new Date(time*1000);
        //let date_now = new Date();
        //date_now = date_now.getTime()-date.getTime();
        //let date_str = ``;
        date = date.toLocaleString();
        return date;
    }

    return(
        <div className="feed_post">
            {
                new_posts.map((post,id_comment) =>{
                    return(
                        <Post_Single 
                        user={post.info.post_user}
                        description={post.info.post_description}
                        content={post.info.post_content}
                        time={handle_time(post.info.post_time.seconds)}
                        profile={post.info.post_profile}
                        user_logado={props.user_login}
                        id_comment={id_comment}
                        />
                    )

                })
            }

        </div>
    );
}

/*
return(
                        <Post_Single 
                        user={post.info.post_user}
                        description={post.info.post_description}
                        content={post.info.post_content}
                        time={handle_time(post.info.post_time.seconds)}
                        profile={post.info.post_profile}
                        user_logado={props.user_login}
                        id_comment={id_comment}
                        />
                    )


*/