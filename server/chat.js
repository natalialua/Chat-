
module.exports = function(io) {

    
    var users = {},

        motivationalMessages = {
            Supportee: [
              
            ],
            Supporter: [
       
            ]
        };
    }

    io.on("connection", function(socket) {

        if (!socket.username) {
            var usernameAllocated = false;
            while (!usernameAllocated) {
                var username = randomstring.generate();
                if (users[username] === undefined) {
                    users[username] = socket;
                    socket.username = username;
                    users[username].skipped = [];
                    users[username].reported = 0;
                    users[username].start = false;
                    users[username].topics = ["Nada"];
                    users[username].type = "Supporter";
                    users[username].language = "en";
                    usernameAllocated = true;
                }
            }
        }

        socket.on("match", function(callback) {
            var matched = false,
                feedback = "",
                blocked = false,
                randomMotivationalMessage = "";

            users[socket.username].start = true;

            if (users[socket.username].partner === undefined) {

                if (users[socket.username].reported <= 5) {

                    for (var username in users) {

                        if (username !== socket.username && users[socket.username].skipped.indexOf(username) === -1
                            && users[username].skipped.indexOf(socket.username) === -1 && users[username].partner === undefined
                            && users[username].reported <= 5 && users[username].start === true && users[username].type !== users[socket.username].type) {

                            for (var topic in users[username].topics) {

                                if (users[socket.username].topics.indexOf(users[username].topics[topic]) !== -1) {

                                    users[username].partner = socket.username;
                                    users[socket.username].partner = username;
                                    users[username].emit("matched");
                                    matched = true;
                                    break;
                                }
                            }

                            if (matched) {
                                break;
                            }
                        }
                    }

                    if (!matched) {

                        for (var username in users) {

                            if (username !== socket.username && users[socket.username].skipped.indexOf(username) === -1
                                && users[username].skipped.indexOf(socket.username) === -1 && users[username].partner === undefined
                                && users[username].reported <= 5 && users[username].start === true && users[username].type !== users[socket.username].type) {

                            
                                if (users[socket.username].topics.indexOf("Anything") !== -1 || users[username].topics.indexOf("Anything") !== -1) {

                                    users[username].partner = socket.username;
                                    users[socket.username].partner = username;
                                    users[username].emit("matched");
                                    matched = true;
                                    break;
                                }

                                if (matched) {
                                    break;
                                }
                            }
                        }

                        
                        if (!matched) {
                            feedback = "No Users Available. Waiting for a match...";
                            var messageIndex = Math.floor(Math.random() * motivationalMessages[users[socket.username].type].length);
                            randomMotivationalMessage = motivationalMessages[users[socket.username].type][messageIndex];
                        }
                    }

                }
              
                else {
                    blocked = true;
                }
            }
         
            else {
                matched = true;
            }

           
        });

    
        socket.on("send message", function(message, callback) {
            var error;
            if (message.trim() !== "") {

                var partner = users[socket.username].partner;
                if (partner) {

                    isprofanity(message, function(profanity) {

                   
                        if (!profanity) {

                            googleTranslate.translate(message, users[partner].language, function(err, messageTranslation) {
                                callback(error);
                                users[partner].emit("receive message", messageTranslation && messageTranslation.translatedText || message);
                            });
                        } else {
                            error = "Message contains profanity.";

                            googleTranslate.translate(error, users[socket.username].language, function(err, errorTranslation) {
                                callback(errorTranslation && errorTranslation.translatedText || error);
                            });

                        }
                    });
                } else {
                    error = "You aren't matched with anyone.";

                    googleTranslate.translate(error, users[socket.username].language, function(err, translation) {
                        callback(translation && translation.translatedText || error);
                    });
                }
            } else {
                error = "Message is empty, message can't be empty.";

                googleTranslate.translate(error, users[socket.username].language, function(err, translation) {
                    callback(translation && translation.translatedText || error);
                });
            }
        });

        socket.on("disconnect", function() {
            if (!socket.username) return;

            var partner = users[socket.username].partner;

            if (partner) {
                delete users[partner].partner;
                users[partner].start = false;
                users[partner].emit("unmatched");
            }

            for (var username in users) {

                
                if (users[username].skipped.indexOf(socket.username) !== -1) {
                    delete users[username].skipped[users[username].skipped.indexOf(socket.username)];
                }
            }

            delete users[socket.username];
        });

        socket.on("skip", function(callback) {
            var partner = users[socket.username].partner,
                feedback;

            if (partner) {
                delete users[partner].partner;
                delete users[socket.username].partner;
                users[socket.username].skipped.push(partner);
                users[partner].emit("unmatched");
                users[partner].start = false;
                users[socket.username].start = false;
                feedback = "User has been skipped.";
            } else {
                feedback = "You aren't matched with anyone.";
            }

            googleTranslate.translate(feedback, users[socket.username].language, function(err, translation) {
                callback(translation && translation.translatedText || feedback);
            });

        });

        socket.on("report", function(callback) {
            var partner = users[socket.username].partner,
                feedback;
            if (partner) {
                delete users[partner].partner;
                delete users[socket.username].partner;
                users[socket.username].skipped.push(partner);
                users[partner].reported++;
                users[partner].start = false;
                users[socket.username].start = false;
                if (users[partner].reported > 5) {
                    users[partner].emit("blocked");
                } else {
                    users[partner].emit("unmatched");
                }
                feedback = "User has been reported.";
            } else {
                feedback = "You aren't matched with anyone.";
            }

            googleTranslate.translate(feedback, users[socket.username].language, function(err, translation) {
                callback(translation && translation.translatedText || feedback);
            });

        });

        socket.on("preferences change", function(data, callback) {
            if (!socket.username) return;

            var feedback;

            if (data.topics.length === 0) {
                feedback = "Please select a topic.";
            } else if (data.topics.indexOf("Anything") !== -1 && data.topics.length > 1) {
                feedback = "You can't select 'Anything' as a topic along with another topic.";
            } else {
                users[socket.username].topics = data.topics;
            }

            if (data.type === "Supporter") {
                users[socket.username].type = "Supporter";
            } else if (data.type === "Supportee") {
                users[socket.username].type = "Supportee";
            } else {
                feedback = "Please select your type, Supporter or a Supportee.";
            }

            callback(feedback)

        });
        socket.on("start again", function() {
            if (!socket.username) return;

            users[socket.username].start = false;
        });

        socket.on("typing", function(typing) {
            if (!socket.username) return;

            var partner = users[socket.username].partner;
            if (partner) {
                users[partner].emit("typing", typing);
            }
        });

        socket.on("get languages", function(callback) {
            if (!socket.username) return;

            googleTranslate.getSupportedLanguages(users[socket.username].language, function(err, languages) {
                callback(languages || []);
            });
        });

        socket.on("language change", function(language) {
            if (!socket.username) return;

            users[socket.username].language = language;
        });

    
        socket.on("translate", function(string, callback) {
            if (!socket.username) return;

       

        socket.on("viewed", function() {

            if (!socket.username) return;

            var partner = users[socket.username].partner;
            if (partner) {
                users[partner].emit("viewed");
            }
        });

    });
});
