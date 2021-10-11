import Stories_card from '../components/Stories_Card.js';

export default function(){


    return(
        <div className="stories">

            {
                [0,1,1,1,1].map((val)=>{
                    return(
                        <Stories_card />
                    )
                })
            }
            <div className="btn_next">
                >
            </div>
        </div>
    )
}