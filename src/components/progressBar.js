import React from 'react';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            actions: [
                {
                    id: 0,
                    text: "do laundry",
                    checked: false
                },
                {
                    id: 1,
                    text: "finish reading Book",
                    checked: false
                },
                {
                    id: 2,
                    text: "Design Course",
                    checked: false
                },
                {
                    id: 3,
                    text: "Bible study",
                    checked: false
                }
            ]
        }
        

        this.handleCheckClick = this.handleCheckClick.bind(this);
    }

    handleCheckClick(e){
       
        if(e.target.checked){
           
            const actionSearched = this.state.actions.find((action) => {
                return action.id == e.target.value
            });

            actionSearched.checked = true;
            const newActions = this.state.actions.filter(action => action.id !== e.target.value);
            const perc = (this.state.actions.filter(action => action.checked === true).length / this.state.actions.length) * 100 ;
                    
            this.setState({
                progress: perc,
                actions: [...newActions]
            },() => console.log(perc));

        } else{
            const actionSearched = this.state.actions.find((action) => {
                return action.id == e.target.value
            });
           
            actionSearched.checked = false;
            const newActions = this.state.actions.filter(action => action.id !== e.target.value);
            const perc = (this.state.actions.filter(action => action.checked === true).length / this.state.actions.length) * 100 ;
            this.setState({
                progress: perc,
                actions: [...newActions]
            },() => console.log(perc));
        }

            
    }
      
    

    render() {
        return (
            <div className="progress" style={styles}>
                <Mover progress={this.state.progress} />
                <Checklist actions={this.state.actions} checkFunction={() =>this.handleCheckClick} />
            </div>
        )
    }
}

const styles = {
    position: "relative",
    width: "300px",
    "borderRadius": "20px",
    height: "20px",
    border: "1px solid black"
}


const Mover = ({ progress }) => (
    <div className="mover" style={{ ...moverStyles, width: `${progress}%` }}></div>
);


const moverStyles = {
    height: "100%",
    background: " red",
    borderRadius: "inherit",
    transition: ".4s ease"

}


const Checklist = ({ actions, checkFunction }) => (
    actions.map(action => (
        <div key={action.id}>
            <input type="checkbox" name="checkers" value={action.id} onChange={checkFunction()} />
            <label htmlFor="checkers">{action.text}</label>
        </div>

    ))

);












export default ProgressBar;
