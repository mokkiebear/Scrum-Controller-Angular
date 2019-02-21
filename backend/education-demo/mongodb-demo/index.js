const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(error => console.log(error.message));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
	const course = new Course({
		name: 'Angular',
		author: 'Maxim',
		tags: ['angular', 'tag2'],
		isPublished: true
	});
	const result = await course.save();
  console.log(result);
}

async function getCourses(){
	const courses = await Course
	//.find({ price: { $gte: 10, $lte: 20 } })
	//.find({ price: { $in: [10, 15, 20] } })
	/*
	 .find()
	 .or([ { author: 'Maxim' }, { isPublished: true } ])
	*/
		.find({ author: 'Maxim', isPublished: true })
		.limit(10)
		.sort({ name: 1 })
		.select({ name: 1 ,tags: 1 });
	console.log(courses);
}

getCourses();
//createCourse();