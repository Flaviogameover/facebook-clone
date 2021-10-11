import cafe from '../resources/cafe.png';
import user from '../resources/user.png';

function Stories_card(){



    return(
        <div className="stories_card" style={{backgroundImage:`url(${cafe})`}}>
            <img className="user_profile_mini" src={user} />
            <p>Flávio Lima</p>
        </div>
    )
}


export default Stories_card;