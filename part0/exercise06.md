sequenceDiagram
participant browser
participant server
participant user

    user->>browser: note: [text from user]
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: POST adds straight to json file

    JavaScript auto adds the new note the the html
