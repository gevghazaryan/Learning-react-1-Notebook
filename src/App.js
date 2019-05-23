import React, { Component } from 'react';
import './App.css';

import NoteForm from './components/NoteForm';
import ReadNodeMode from './components/ReadNoteMode';

class App extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.state = {notes: [],editMode: true};
    this.save = this.save.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }
  init(storage) {
    let notebookStorage = storage['notebook'];
    const initState = {notes: []};
    if(!notebookStorage) {
      storage.setItem('notebook', JSON.stringify(initState));
    } else {
      const state = JSON.parse(storage.getItem('notebook'));
      console.log(state)
      this.setState({notes: state.notes})
    }
  }
  deleteNote(index) {
    let storage = window.localStorage;
    let notebookStorage = JSON.parse(storage['notebook']);
    let notes = notebookStorage.notes;
    console.log('before',notes)
    notes.splice(index,1);
    console.log('after',notes)
    notebookStorage['notes'] = notes;
    storage.setItem('notebook',JSON.stringify(notebookStorage));
    this.setState({notes: notes})
  }
  save(data) {
    let {note,title} = data
    let storage = window.localStorage;
    let notebookStorage = JSON.parse(storage['notebook']);
    let notes = notebookStorage.notes;
    notes.push({title,note});
    console.log(notes,notebookStorage)
    notebookStorage['notes'] = notes
    storage.setItem('notebook',JSON.stringify(notebookStorage));
    this.setState({notes: notes})
  }
  componentDidMount() {
    this.init(window.localStorage)
  }
  handleModeChange() {
    this.setState(prevState => ({editMode: !prevState.editMode}))
  }
  render() {
    let output = ''
    if(this.state.editMode) {
      output = <NoteForm save={this.save} />
    } else {
      output = <ReadNodeMode notes={this.state.notes} deleteNote={this.deleteNote}/>
    }
    return (
      <div className="App">
        <h1>Inote</h1>
        <button onClick={this.handleModeChange} className="default">Hit</button>
        <p>{new Date().toDateString()}</p>
        {output}
      </div>
    );
  }
}

export default App;
