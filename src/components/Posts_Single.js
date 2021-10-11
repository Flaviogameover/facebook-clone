import {HiDotsHorizontal} from 'react-icons/hi';
import {BiWorld} from 'react-icons/bi';
import {FcLike,FcDislike} from 'react-icons/fc';
import {GoComment} from 'react-icons/go';
import {RiShareForwardLine} from 'react-icons/ri';
import {AiOutlineHeart} from 'react-icons/ai';
import {useState,useEffect} from 'react';


function Post_Single(props){

    const [show_comment,set_show_comment] = useState(false);


    function toggle_comment(e){
        e.preventDefault();
        let comment_div = document.getElementById(`comment_hide_${props.id_comment}`);
        if(show_comment){
            //comment_div.style.display = 'flex';
            set_show_comment(!show_comment);
        }else{
            //comment_div.style.display = 'none';
            set_show_comment(!show_comment);

        }
    }

    return(
        <div className="feed_post_single">
            <div className="feed_who_post">
                <div className="feed_who_post_img">
                    <img className="user_profile_mini" src={props.profile} />
                </div>
                <div className="feed_who_post_info">
                    <p><b>{props.user}</b></p>
                    <span>{props.time}</span>
                    <BiWorld/>
                </div>
                <div className="feed_who_post_dots dots">
                    <HiDotsHorizontal/>
                </div>
                
            </div>
            <div className="feed_post_content">
                <div className="feed_post_content_description">
                    <p>{props.description}</p>
                </div>
                <div className="feed_post_content_archive">
                    <img src={props.content} />
                </div>
            </div>
            <div className="feed_post_likes_comments">
                <div className="feed_post_likes">
                    <FcLike/>
                    <FcDislike/>
                    <span>430</span>
                </div>
                <div className="feed_post_comments">
                    <span>88 Comments</span>
                    <span>4 Shares</span>
                </div>
            </div>
            <div className="feed_post_user_interaction">
                <div className="feed_post_user_like">
                    <AiOutlineHeart/>
                    <span>Curtir</span>
                </div>
                <div onClick={e=>toggle_comment(e)} className="feed_post_user_comment">
                    <GoComment/>
                    <span>Comentar</span>
                </div>
                <div className="feed_post_user_share">
                    <RiShareForwardLine/>
                    <span>Compartilhar</span>
                </div>
            </div>
            <div id={`comment_hide_${props.id_comment}`} style={{display: 'none'}} className="user_post_form">
                <div className="user_img_post">
                    <img className="user_profile_mini" src={props.user_logado.photoURL} />
                </div>
                <div className="user_post_input">
                    <input type="text" placeholder="Escreva um comentário..." />
                </div>
            </div>
        </div>
    );
}

export default Post_Single;