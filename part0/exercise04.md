sequenceDiagram
participant browser
participant server
participant user

    user->>browser: note: [text from user]
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

    Note right of browser server saves new note and adds to json file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser the JavaScript file
    deactivate server

    Note right of browser: browser executes JavaScript code from server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->>browser: JSON info, including new note
    deactivate server

    Note right of browser: Browser runs a function to render notes
