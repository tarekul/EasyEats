import React from 'react';
import './genpage.css';

const List = (props) => {
    const { categories, image_url, menu_url, name, price, poll, isDisabled, handleOnClick, isChecked, voteCount } = props;
    return (
        <>
            <div className='row container mx-0' >
                <div className='col-sm-12 col-md-2 restList_img'>
                    <img className='card-img' style={{ height: '100px', width: '100%', objectFit: 'cover' }} src={image_url} alt={name} />
                </div>
                <div className='card-header col restList_box' >
                    <li className="list-group-item">
                        <div className='row justify-content-between'>
                            <span className='col h4'>{name}</span>
                            <a href={menu_url} target='_blank' className='col-sm-2 button-red'rel="noopener noreferrer">Menu</a>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className='row'>
                            <div className='col col-xs-10'>
                                <span className='col h6' style={{ paddingLeft: '2px', paddingRight: '2px' }}> {categories.join(', ')} </span>
                            </div>
                            {(price) ? <span className='col-sm-1'>{price}</span> : <span className='col-sm-1'>--</span>}
                            {
                                (poll) ?
                                    <div className=" col-sm-2 form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" onClick={handleOnClick('voted_on')} value={name} disabled={isDisabled} checked={isChecked}/>
                                        <label className="form-check-label h6" htmlFor="inlineCheckbox1"> Vote | Count: {voteCount}</label>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    </li>
                </div>
            </div>


        </>

    )
}
export default List;