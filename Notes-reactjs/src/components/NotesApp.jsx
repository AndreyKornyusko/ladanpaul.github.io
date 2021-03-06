import React, { Component } from 'react';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
import './Note.css';

export default class NotesApp extends Component {
  constructor() {
    super()

    this.state = {
      notes: []
    }

    this.handleNoteAdd = ::this.handleNoteAdd;
    this.handleNoteDelete = ::this.handleNoteDelete;
  }

  componentDidMount() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if(savedNotes) {
      this.setState({
        notes: savedNotes,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state.notes) {
      this.saveToLocalStorage();
    }    
  }

  handleNoteAdd(newNote) {
    this.setState({
      notes: [newNote, ...this.state.notes]
    }, this.saveToLocalStorage);
  }

  handleNoteDelete(noteId) {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId)
    });
  }

  saveToLocalStorage() {
    console.log('this state notes: ', this.state.notes);
    
    const notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  }

  render() {
    return(
      <div className="app">
        <h2 className="app__header"> NotesApp </h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd}/>
        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
      </div>
    );
  }
}