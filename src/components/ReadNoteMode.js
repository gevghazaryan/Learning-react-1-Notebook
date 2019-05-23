import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class NoteReadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: [],selectedNote: null};
        this.showNote = this.showNote.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {

    }
    delete(index) {
        if(this.state.selectedNote !== null) {
            this.props.deleteNote(index);
        }
    }
    showNote(index) {
        console.log(index);
        this.setState({selectedNote: index});
    }
    render() {
        let title = null;
        let text = null;
        return(
            <div>
                <ul className="horizontal flexed short">
                    {this.props.notes.map((item,index) => 
                        <li key={index} className="tile">
                            <a onClick={() => this.showNote(index)} href="#">{item.title}</a>
                        </li>
                    )}
                </ul>
                <div>
                    {this.props.notes.map((item,index) => {
                        if(index === this.state.selectedNote) {
                            return (
                                <div>
                                    <h3>{item.title} <button onClick={() => this.delete(index)}>delete</button></h3>
                                    <p>{item.note}</p>
                                    {ReactDOM.createPortal(<p className="absolut">Hello kitty</p>,document.body)}
                                </div>
                            )
                        } else return null
                    })}
                </div>
            </div>
        )
    }
}

export default NoteReadForm;