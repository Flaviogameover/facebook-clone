import user from '../resources/user.png';
import {RiLiveFill} from "react-icons/ri";
import {IoIosImages} from "react-icons/io";
import {MdInsertEmoticon} from "react-icons/md";

import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth,storage,db} from "../firebase.js";

export default function(props){

    const [open_photo_modal,set_open_photo_modal] = useState(false);
    const [post_infos,set_post_infos] = useState({});

    function handle_post_photo(e){
        e.preventDefault();
        post_photo(post_infos);
    }

    function post_photo(infos){
        //let date = new Date();
        //console.log(date.getHours() + ":" + date.getMinutes() + ":" + date)
        const upload_task = storage.ref(`post_images/${infos.file.name}`).put(infos.file);
        upload_task.on('state_changed',snapshot=>{},(err)=>{
            console.log(err.message);   
        },()=>{
            storage.ref("post_images").child(infos.file.name).getDownloadURL()
            .then(url=>{
                db.collection('posts').add({
                    post_content: url,
                    post_description: infos.description,
                    post_time: firebase.firestore.FieldValue.serverTimestamp(),
                    post_user: props.user_login.displayName,
                    post_profile: props.user_login.photoURL
                });
                set_post_infos({});
                document.getElementById('postar_foto').reset();
                alert('Postado!');
                toggle_photo_modal();
            })
        });
    }

    function toggle_photo_modal(e){
        let modal = document.querySelector(".photo_modal");
        if(open_photo_modal){
            modal.style.display = "none";
            set_open_photo_modal(!open_photo_modal);
        }else{
            modal.style.display = "block";
            set_open_photo_modal(!open_photo_modal);
        }
    }

    return(
        <div className="user_post">
            <div className="photo_modal modal" style={{display:"none"}}>
                <div className="photo_modal_form modal_form">
                    <div onClick={e=>toggle_photo_modal(e)} className="photo_modal_close_btn modal_close_btn">X</div>
                    <h3>Postar Foto</h3>
                    <form id="postar_foto" onSubmit={e=>handle_post_photo(e)} encType="multipart/form-data">
                        <input onChange={e=>set_post_infos({...post_infos,file:e.target.files[0]})} type="file" />
                        <textarea onChange={e=>set_post_infos({...post_infos,description:e.target.value})} placeholder="Descrição (Opcional)"></textarea>
                        <div className="photo_modal_form_submit div_btn_submit">
                            <input type="submit" className="btn_submit" name="postar" value="Postar" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="user_post_form">
                <div className="user_img_post">
                    <img className="user_profile_mini" src={props.user_login.photoURL} />
                </div>
                <div className="user_post_input">
                    <input type="text" placeholder={`No que está pensando ${props.user_login.displayName} ?`}/>
                </div>
            </div>
            <div className="user_post_action">
                <div onClick={e=>toggle_photo_modal(e)} className="post_icon video_icon">
                    <IoIosImages/>
                    <span>Foto</span>
                </div>
                <div className="post_icon image_icon">
                    <RiLiveFill/>
                    <span>Video</span>
                </div>
                <div className="post_icon feeling_icon">
                    <MdInsertEmoticon />
                    <span>Sentimento/Atividade</span>
                </div>
            </div>
        </div>
    )
}