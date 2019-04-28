import React, {Component} from 'react'
import List from '../components/restList'

class PollPage extends Component{
    render(){
        return (
            <>
            <form>
                <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                
                {
                    List.map((e, i) => {
                        return <List img_url={e.img_url} restaurant={e.restaurant} cuisine={e.cuisine} />
                    })
                }
                </div>
            </form>
        </>
            )
    }
}

export default PollPage 