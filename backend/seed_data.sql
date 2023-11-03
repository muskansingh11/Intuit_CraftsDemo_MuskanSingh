CREATE DATABASE craftsdemo;

\c craftsdemo;

DROP TABLE IF EXISTS Users CASCADE;

DROP TABLE IF EXISTS Events CASCADE;

DROP TABLE IF EXISTS event_user_xref CASCADE;

CREATE TABLE IF NOT EXISTS Users (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    events_registered INT DEFAULT 0,
    username VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Events (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT '',
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

-- composite key user_id and event_id
CREATE TABLE IF NOT EXISTS event_user_xref (
    user_id INT REFERENCES Users(id),
    event_id INT REFERENCES Events(id),
    PRIMARY KEY (user_id, event_id)
);

INSERT INTO
    Users (
        name,
        events_registered,
        username
    )
VALUES
    (
        'John Doe',
        3,
        'johndoe123'
    ),
    (
        'Jane Smith',
        1,
        'janesmith456'
    ),
    (
        'Sam Johnson',
        2,
        'samjohnson789'
    ),
    (
        'Emily Brown',
        0,
        'emilybrown001'
    );

INSERT INTO
    Events (name, category, start_time, end_time)
VALUES
    (
        'Event 1',
        'Sports',
        '2023-10-22 10:00:00',
        '2023-10-22 12:00:00'
    ),
    (
        'Event 2',
        'Music',
        '2023-10-23 15:30:00',
        '2023-10-23 18:00:00'
    ),
    (
        'Event 3',
        'Conference',
        '2023-10-25 09:00:00',
        '2023-10-25 17:00:00'
    ),
    (
        'Event 4',
        'Art',
        '2023-10-27 14:00:00',
        '2023-10-27 16:30:00'
    );

INSERT INTO
    event_user_xref (user_id, event_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 2),
    (3, 2),
    (3, 3);