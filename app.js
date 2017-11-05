var express = require("express"),
bodyParser = require("body-parser"),
app = express(),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),

mongoose = require("mongoose");


//APP CONFIG
mongoose.connect("mongodb://admin:admin@ds249025.mlab.com:49025/student_enrollment_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//MODEL CONFIG.
var studentSchema = new mongoose.Schema({
	"studentID":{ type:Number, required:true, unique:true },
	"firstName":{ type:String, required:true,  unique:true },
	"surname":{ type:String, required:true, unique:true	},
	"sex":{ type:String },
	"age":{ type:Number },
	"stateOfOrigin": { type: String },
	"address":{ type: String },
	"regDate":{ type: Date, default: Date.now},
	"programLanguage": {type: String},
	"proficiency": {type: String},
	"bio":{ type: String },
	"image":{type: String}
});


var Student = mongoose.model("Student", studentSchema);

// Student.create({
// 	studentID: "20170511001",
// 	firstName: "Chimaroke",
// 	surname: "Amaike",
// 	sex: "Male",
// 	age: "24",
// 	programLanguage: "Python"
// })
//RESTFUL ROUTES

app.get("/", function(req, res){
	res.redirect("/students");
})


app.get("/students", function(req, res){

	Student.find({}, function(err, students){
		if(err){
			console.log("ERROR!!!")
		} else {
			res.render("index", {students: students});
		}
	})
	
})

//new route
app.get("/students/new", function(req, res){
	res.render("new");
});


//create route
app.post("/students", function(req, res){
	//create student
	req.body.student.body = req.sanitize(req.body.student.body);
	Student.create(req.body.student, function(err, newStudent){
		if(err){
			res.render("new");
		} else {
			res.redirect("/students");
		}
	});
});

//show route
app.get("/students/:id", function(req, res){
	Student.findById(req.params.id, function(err, foundStudent){
		if(err){
			res.redirect("/students");
		} else {
			res.render("show", {student: foundStudent});
		}
	})
});

//edit route
app.get("/students/:id/edit", function(req, res){
	Student.findById(req.params.id, function(err, foundStudent){
		if(err){
			res.redirect("/students");
		} else {
			res.render("edit", {student: foundStudent});
		}
	});
});

//update route
app.put("/students/:id", function(req, res){
	req.body.student.body = req.sanitize(req.body.student.body);
	Student.findByIdAndUpdate(req.params.id, req.body.student, function(err, updateStudent){
		if(err){
			res.redirect("/students");
		} else {
			res.redirect("/students/" + req.params.id);
		}
	}); 

});

//delete route
app.delete("/students/:id", function(req, res){
	Student.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/students");
		} else {
			res.redirect("/students")
		}
	});
}); 

app.listen(process.env.PORT || 3020, process.env.IP, function(){
	console.log("server Started");
})
