
/* ======= Model ======= */

var model = {
    currentNote: null,
    notes: [
        {
            clickCount : 0,
            name : 'Note 01',
            description: "Das ist Text um die Notizz zu beschreiben",
            finished: false,
            category: "Html",
            rating: 5,
            dueDate:"2016-01-01",
            createDate:"2016-01-01"
        },
        {
            clickCount : 0,
            name : 'Note 02',
            description: "Das ist Text um die Notizz zu beschreiben",            
            finished: false,
            category: "Html",
            rating: 4,
            dueDate:"2016-01-02",
            createDate:"2016-01-01"
        },
        {
            clickCount : 0,
            name : 'Note 03',
            description: "Das ist Text um die Notizz zu beschreiben",
            finished: false,
            category: "Html",
            rating: 3,
            dueDate:"2016-01-03",
            createDate:"2016-01-01"
        },
        {
            clickCount : 0,
            name : 'Note 04',
            description: "Das ist Text um die Notizz zu beschreiben",
            finished: false,
            category: "Html",
            rating: 5,
            createDate:"2016-01-01",
            dueDate:"2016-01-08"
        },
        {
            clickCount : 0,
            name : 'Note 05',
            description: "Das ist Text um die Notizz zu beschreiben",
            finished: false,
            category: "Html",
            rating: 5,
            createDate:"2016-01-01",
            dueDate:"2016-01-10"
        }
    ]
};


/* ======= viewModel ======= */

var viewModel = {

    init: function() {
        // set our current note to the first one in the list
        model.currentNote = model.notes[0];

        // tell our views to initialize
        noteListView.init();
        noteView.init();
    },

    getCurrentNote: function() {
        return model.currentNote;
    },

    getNotes: function() {
        return model.notes;
    },

    // set the currently-selected note to the object passed in
    setCurrentNote: function(note) {
        model.currentNote = note;
    },

    // increments the counter for the currently-selected note
    incrementCounter: function() {
        model.currentNote.clickCount++;
        noteView.render();
    }
};


/* ======= View ======= */

var noteView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.noteElem = document.getElementById('note-details');
        this.noteNameElem = document.getElementById('note-name');
        //this.noteImageElem = document.getElementById('note-img');
        //this.countElem = document.getElementById('note-count');

        // on click, increment the current note's counter
        //this.noteImageElem.addEventListener('click', function(){
        //    viewModel.incrementCounter();
        //});

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current note
        var currentNote = viewModel.getCurrentNote();
        //this.countElem.textContent = currentNote.clickCount;
        this.noteNameElem.textContent = currentNote.name;
        //this.noteImageElem.src = currentNote.imgSrc;
    }
};

var noteListView = {

    init: function() {
        // store the DOM element for easy access later
        this.noteListElem = document.getElementById('note-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var note, elem, i;
        // get the notes we'll be rendering from the viewModel
        var notes = viewModel.getNotes();

        // empty the note list
        this.noteListElem.innerHTML = '';

        // loop over the notes
        for (i = 0; i < notes.length; i++) {
            // this is the note we're currently looping over
            note = notes[i];

            // make a new note list item and set its text
            elem = document.createElement('li');
            elem.textContent = note.name;

            // on click, setcurrentNote and render the noteView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the note variable to the click event function)
            elem.addEventListener('click', (function(noteCopy) {
                return function() {
                    viewModel.setCurrentNote(noteCopy);
                    noteView.render();
                };
            })(note));

            // finally, add the element to the list
            this.noteListElem.appendChild(elem);
        }
    }
};

// make it go!
viewModel.init();
