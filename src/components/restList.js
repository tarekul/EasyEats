import React from 'react';

const List = (props) => {
    const { categories, display_phone, image_url, menu_url, name, phone, price,} = props;
    return (
        <>
            <div className='row container' >
                <div className='col-sm-12 col-md-2'>
                    <img className='card-img' style={{ height: '100px', width: '100%', objectFit: 'cover'}} src={image_url} alt={name} />
                </div>
                <div className='card-header col' >
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{categories.map((e, i) => { return <span key={i}> {e} </span>})} <a href={menu_url} >Menu</a></li>
                </div>
            </div>


        </>

    )
}
export default List;