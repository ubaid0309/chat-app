const chats = [
    {
        "_id": "chat001",
        "isGroupChat": true,
        "chatName": "Awesome Team",
        "users": [
            { "name": "Alice", "email": "alice@example.com" },
            { "name": "Bob", "email": "bob@example.com" }
        ]
    },
    {
        "_id": "chat002",
        "isGroupChat": false,
        "chatName": "Private Chat",
        "users": [
            { "name": "Charlie", "email": "charlie@example.com" },
            { "name": "David", "email": "david@example.com" }
        ]
    },
    {
        "_id": "chat003",
        "isGroupChat": true,
        "chatName": "Friends Hangout",
        "users": [
            { "name": "Eve", "email": "eve@example.com" },
            { "name": "Frank", "email": "frank@example.com" }
        ]
    },
    {
        "_id": "chat004",
        "isGroupChat": false,
        "chatName": "Work Discussions",
        "users": [
            { "name": "Grace", "email": "grace@example.com" },
            { "name": "Harry", "email": "harry@example.com" }
        ]
    },
    {
        "_id": "chat005",
        "isGroupChat": true,
        "chatName": "Study Group",
        "users": [
            { "name": "Ivy", "email": "ivy@example.com" },
            { "name": "Jack", "email": "jack@example.com" }
        ]
    }
]

module.exports = chats;
