import React from 'react';

const List = (props) => {
    return (
        <>
            <div className='row container' >
                <div className='col-2'>
                    <img className='card-img' style={{ width: '100px' }} src={props.img_url} alt='../assets/logo.png' />
                </div>
                <div className='card-header col' >
                    <li className="list-group-item">Name of Restaurant {props.restaurant}</li>
                    <li className="list-group-item">Type of Restaurant {props.cuisine} <a href='' src={props.menu} >Menu</a></li>
                </div>
            </div>


        </>

    )
}
export default List;