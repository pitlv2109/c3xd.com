var mongoose = require('mongoose');
var users = require('../../models/users');
var schools = require('../../models/schools');
var posts = require('../../models/posts');

mongoose.connect('mongodb://memeapp:memeapp123@ds137220.mlab.com:37220/memeapp');

var usersModel = users.usersModel;
var schoolsModel = schools.schoolsModel;
var postsModel = posts.postsModel;

// Create a normal (type 0) user
function create_new_user(username) {
    var new_user = new usersModel();
    new_user.username = username;
    new_user.type = 3;
    new_user.score = 0;
    new_user.posts = [];
    new_user.save(function(err) {
        if (err) throw err;
    });
    console.log("Created a new user");
}

// Create a new school
function create_new_school(name, banner, abbr) {
    var new_school = new schoolsModel();
    new_school.name = name;
    new_school.banner = banner;
    new_school.abbr = abbr;
    posts = [];
    new_school.save(function(err) {
        if (err) throw err;
    });
    console.log("Created a new school named " + name + " with abbr: " + abbr);
}

// Create a new post
function insert_new_post(/*school_id, user_id,*/ url) {
    var new_post = new postsModel();
    new_post.school_id = school_id;
    new_post.user_id = user_id;
    new_post.url = url;
    new_post.score = 0;
    new_post.save(function(err) {
        if (err) throw err;
    });
    console.log("Created a new post");
}

// Async function to return all schools from the db
function get_all_schools(callback) {
    // Return all documents in the schools collection
    // Callback function
    mongoose.model('schools').find({}, function(err, data) {
        if (err) {
            console.log(err);
            callback([]);
        }
        else {
            // Get all schools name from the school object array
            schools = [];
            for(i = 0; i < data.length; i++) {
                schools.push(data[i].name);
                schools.push(data[i].abbr);
            }
            // Wrap this around to get the return value from this async find() function
            callback(schools);
        }
    });
}

// Get the abbr from the given school_name
function get_abbr(school_name, callback) {
    mongoose.model('schools').findOne({'name': school_name}, function(err, school) {
        if (err) {
            console.log(err);
            callback("");
        }
        else {
            if (school != null) {
                callback(school.abbr);
            }
            else {
                callback("");
            }
        }
    });
}

module.exports = {
    create_new_user: create_new_user,
    create_new_school: create_new_school,
    insert_new_post: insert_new_post,
    get_all_schools: get_all_schools,
    get_abbr: get_abbr,
}
