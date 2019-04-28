import React from 'react';

const List = (props) => {
    const { categories, display_phone, image_url, menu_url, name, phone, price, } = props;
    return (
        <>
            <div className='row container' >
                <div className='col-sm-12 col-md-2'>
                    <img className='card-img' style={{ height: '100px', width: '100%', objectFit: 'cover' }} src={image_url} alt={name} />
                </div>
                <div className='card-header col' >
                    <li className="list-group-item">
                        <div className='row justify-content-between'>
                            <span className='col h4'>{name}</span>
                            <a href={menu_url} target='_blank' className='col-sm-2'>Menu</a>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className='row'>
                            <div className='col col-xs-10'>
                                <span  className='col h6' style={{paddingLeft: '2px', paddingRight: '2px'}}> {categories.join(', ')} </span>
                            </div>
                            {(price)? <span className='col-sm-2'>{price}</span>: <span className='col-sm-2'>--</span>}
                        </div>
                    </li>
                </div>
            </div>


        </>

    )
}
export default List;