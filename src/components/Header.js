import {FaFacebook, FaSearch, FaAlignJustify} from "react-icons/fa";
import {RiLogoutBoxRFill,RiLogoutBoxFill} from "react-icons/ri";
import {GoSignIn} from "react-icons/go";
import {auth,db,storage} from "../firebase.js";
import {useState,useEffect} from "react";


function Header(props){

    const [new_account,set_new_account] = useState({});
    const [login,set_login] = useState({});
    const [modal_new_account,modal_set_new_account] = useState(false);

  
    function logout(e){
        e.preventDefault();
        auth.signOut().then((auth)=>{
            props.set_user_login(null);
        })
    }

    function toggle_account_modal(e){
        let modal = document.querySelector(".account_modal");
        if(modal_new_account){
            modal.style.display = "none";
            modal_set_new_account(!modal_new_account);
        }else{
            modal.style.display = "block";
            modal_set_new_account(!modal_new_account);
        }

    }

    function handle_criar_conta(e){
        e.preventDefault();
        criar_conta(new_account);
        //post_photo(post_infos);
    }

    function criar_conta(infos){
        const criar_task = storage.ref(`user/${infos.profile.name}`).put(infos.profile);
        criar_task.on('state_changed',snapshot=>{},err=>{
            console.log(err.message);
        },()=>{
            storage.ref('user').child(infos.profile.name).getDownloadURL()
            .then(url=>{
                auth.createUserWithEmailAndPassword(infos.email,infos.senha)
                .then((authUser)=>{
                    authUser.user.updateProfile({
                        displayName: infos.username,
                        photoURL:url
                    });
                    alert('Conta criada com sucesso!');
                    set_new_account({});
                    toggle_account_modal();
                    document.getElementById('logar').reset();
                    window.location.href = '/';
                });
            });
        });
    }


    function toggle_login_modal(e){
        let modal = document.querySelector(".login_modal");
        if(modal_new_account){
            modal.style.display = "none";
            modal_set_new_account(!modal_new_account);
        }else{
            modal.style.display = "block";
            modal_set_new_account(!modal_new_account);
        }
    }

    function handle_logar(e){
        e.preventDefault();
        logar(login);
    }

    function logar(infos){
        auth.signInWithEmailAndPassword(infos.email, infos.senha).then((auth)=>{
            alert('Logado!');
            window.location.href = '/';
        }).catch(err=>{
            alert(err.message);
        })
    }

    function update_info(e){
        e.preventDefault();
    }

    return(
        <div className="header">
            <div className="account_modal modal" style={{display:"none"}}>
                <div className="modal_form account_modal_form">
                    <div onClick={e=>toggle_account_modal(e)} className="modal_close_btn">X</div>
                    <h3>Cadastre-se</h3>
                    <form id="criar_conta" onSubmit={e=>handle_criar_conta(e)} encType="multipart/form-data">
                        <input onChange={e=>set_new_account({...new_account,name:e.target.value})} type="text" placeholder="Seu nome..."/>
                        <input onChange={e=>set_new_account({...new_account,username:e.target.value})} type="text" placeholder="Seu username..."/>
                        <input onChange={e=>set_new_account({...new_account,email:e.target.value})} type="email" placeholder="Seu email..."/>
                        <input onChange={e=>set_new_account({...new_account,senha:e.target.value})} type="password" placeholder="Sua senha..."/>
                        <input onChange={e=>set_new_account({...new_account,profile:e.target.files[0]})} type="file" />
                        <div className="account_modal_form_submit div_btn_submit">
                            <input type="submit" className="btn_submit" name="criar" value="Criar" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="login_modal modal" style={{display:"none"}}>
                <div className="modal_form account_modal_form">
                    <div onClick={e=>toggle_login_modal(e)} className="modal_close_btn">X</div>
                    <h3>Logar</h3>
                    <form id="logar" onSubmit={e=>handle_logar(e)}>
                        <input onChange={e=>set_login({...login,email:e.target.value})} type="email" placeholder="Seu email..."/>
                        <input onChange={e=>set_login({...login,senha:e.target.value})} type="password" placeholder="Sua senha..."/>
                        <div className="account_modal_form_submit div_btn_submit">
                            <input type="submit" className="btn_submit" name="logar" value="Logar" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="header_left">
                <div className="logo_fb">
                    <FaFacebook/>
                </div>
                <div className="search_fb">
                    <FaSearch/>
                </div>
                <div className="menu_fb">
                    <FaAlignJustify/>
                </div>
            </div>
            <div className="header_right">
                {
                    (!props.user_login)?
                    <div onClick={e=>toggle_account_modal(e)} className="plus_icon">
                        <GoSignIn/>
                    </div>
                    :
                    <div></div>
                }
                <div onClick={e=>toggle_login_modal(e)} className="plus_icon">
                    <RiLogoutBoxFill/>
                </div>
                <div onClick={e=>logout(e)} className="plus_icon">
                    <RiLogoutBoxRFill/>
                </div>
            </div>
        </div>
    );
}

export default Header;