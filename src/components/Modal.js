import React from 'react';

export default props => {
    const { specHandleOnClick, handleOnChange, handleOnPollSubmit, votes } = props;
    return (
        <>
            <button type='button' className="btn btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter" style={{ width: '100%' }} onClick={specHandleOnClick} >
                Create Poll
            </button>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Votes Required</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <input className="form-control" type="text" placeholder="2 votes or more" value={votes} onChange={handleOnChange('votes')}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleOnPollSubmit('modal')}>Go Vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};