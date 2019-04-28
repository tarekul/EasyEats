import React from 'react';
import logo from '../components/logo.jpg';

const InputField=(props)=>{
    const {handleInputChange,handleOnClick,states} = props
    return(
        <>
            <div className='mt-5 pt-5'>
                    <form >
                        <div className='image'  >
                            <img src={logo} alt='logo' />
                        </div>
                        <div className='row justify-content-center'> 
                            <div className='col ml-4 col-sm-8 col-md-5' style={{ background: 'red' }}>
                                <div className="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" onChange={e => handleInputChange(e)} name="address" className="form-control" id="validationCustom01" placeholder="1234 Main St" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputCity">City</label>
                                        <input type="text" onChange={e => handleInputChange(e)} name="city" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label for="inputState">State</label>
                                        <select id="inputState" onChange={e => handleInputChange(e)} name="state" class="form-control">
                                            <option selected>Choose...</option>
                                            {
                                                states.map((e, i) => {
                                                    return (<option key={i} value={e}>{e}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="inputZip">Zip</label>
                                        <input type="text" onChange={e => handleInputChange(e)} name="zip" className="form-control" id="inputZip" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-info" onClick={handleOnClick}>Enter</button>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
}
export default InputField;

//store then import here
