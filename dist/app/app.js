/* ======= Model ======= */
var model = {
    currentNote: null,
    notes: [
        {
            clickCount: 0,
            name: 'Note 01',
            imgSrc: '../../img/434164568_fea0ad4013_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount: 0,
            name: 'Note 02',
            imgSrc: '../../img/4154543904_6e2428c421_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount: 0,
            name: 'Note 03',
            imgSrc: '../../img/22252709_010df3379e_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount: 0,
            name: 'Note 04',
            imgSrc: '../../img/1413379559_412a540d29_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount: 0,
            name: 'Note 05',
            imgSrc: '../../img/9648464288_2516b35537_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};
/* ======= Octopus ======= */
var octopus = {
    init: function () {
        // set our current note to the first one in the list
        model.currentNote = model.notes[0];
        // tell our views to initialize
        noteListView.init();
        noteView.init();
    },
    getCurrentNote: function () {
        return model.currentNote;
    },
    getNotes: function () {
        return model.notes;
    },
    // set the currently-selected note to the object passed in
    setCurrentNote: function (note) {
        model.currentNote = note;
    },
    // increments the counter for the currently-selected note
    incrementCounter: function () {
        model.currentNote.clickCount++;
        noteView.render();
    }
};
/* ======= View ======= */
var noteView = {
    init: function () {
        // store pointers to our DOM elements for easy access later
        this.noteElem = document.getElementById('note-details');
        this.noteNameElem = document.getElementById('note-name');
        this.noteImageElem = document.getElementById('note-img');
        this.countElem = document.getElementById('note-count');
        // on click, increment the current note's counter
        this.noteImageElem.addEventListener('click', function () {
            octopus.incrementCounter();
        });
        // render this view (update the DOM elements with the right values)
        this.render();
    },
    render: function () {
        // update the DOM elements with values from the current note
        var currentNote = octopus.getCurrentNote();
        this.countElem.textContent = currentNote.clickCount;
        this.noteNameElem.textContent = currentNote.name;
        this.noteImageElem.src = currentNote.imgSrc;
    }
};
var noteListView = {
    init: function () {
        // store the DOM element for easy access later
        this.noteListElem = document.getElementById('note-list');
        // render this view (update the DOM elements with the right values)
        this.render();
    },
    render: function () {
        var note, elem, i;
        // get the notes we'll be rendering from the octopus
        var notes = octopus.getNotes();
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
            elem.addEventListener('click', (function (noteCopy) {
                return function () {
                    octopus.setCurrentNote(noteCopy);
                    noteView.render();
                };
            })(note));
            // finally, add the element to the list
            this.noteListElem.appendChild(elem);
        }
    }
};
// make it go!
octopus.init();
//# sourceMappingURL=app.js.map