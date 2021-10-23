import React from 'react'

const MyButton = props => {
    // let baca = 0;

    // const [state, setState] = React.useState(0);
    // const [state2, setState2] = React.useState(0);\
    
    // const onClicked = () => {
    //     setState(state + 1);
    //     setState2(state2 + 2);
    //     baca = baca+3;
    // }
    
    const [state, setState] = React.useState({loading:true, data: []});
    const onClicked = () => {
        setState({loading:false, data: [1, 2, 3]});
    }
    
    return <div>
        {/* Baca: {baca} <br />
        State: {state} <br />
        State2: {state2} <br /> */}
        <p>{props.text}</p>
        <button onClick={onClicked}>{props.title}</button>
        {state.loading && <div>Loading...</div>}
        {!state.loading && <div>Data Loaded: {state.data.length}</div>}
    </div>
}

export default MyButton;