import React, {Component} from 'react';


class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '',note: '',error: ''};
        this.titleChange = this.titleChange.bind(this);
        this.noteChange = this.noteChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    titleChange(e) {
        this.setState({title: e.target.value});
    }
    noteChange(e) {
        this.setState({note: e.target.value});
    }
    handleSave() {
        let {title,note} = this.state;
        if(title == '' || note == '') {
            this.setState({error: true});
        } else {
            this.props.save({note: this.state.note,title: this.state.title,error: false})
            this.setState({title: '',note: ''})
        }
    }
    render() {
        return(
            <div>
                <form>
                    <label>
                        Title
                        <input
                            type='text'
                            placeholder='Enter note title'
                            onChange={this.titleChange}
                            value={this.state.title}
                        />
                    </label>
                    <label>
                        Notes
                        <textarea 
                            placeholder='enter your notes'
                            onChange={this.noteChange}
                            value={this.state.note}
                        ></textarea>
                    </label>
                    {this.state.error ? <h2>there is empty field</h2> : ""}
                    <button type='button' onClick={this.handleSave}>Save</button>
                </form>
            </div>
        )
    }
}

export default NoteForm;