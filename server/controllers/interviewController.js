const Interview = require('../models/interview');


// schedule interview 
const scheduleInterview = async (req, res) => {
    // getting data from req body
    const { type, dateTime, interviewer } = req.body;
    try {
        // check for user request is authenticated
        if (!req.user) {
            console.error(" req.user is missing");
            return res.status(401).json({ message: "User not authenticated" });
        }
        // create new interview 
        const interview = new Interview({ user: req.user._id, type, dateTime, interviewer });
        // save it to DB
        await interview.save();
        res.status(201).json({ success: true, message: "interview scheduled succesfully", interview })
    }
    // handle error 
    catch (err) {
        console.error('Schedule Interview Error:', err.message);
        res.status(500).json({ message: "Failed to schedule Interview", error: err.message });
    }
}

// getting user interviews base on status type 
const getUserInterview = async (req, res) => {
    try {
        // getting status by query param 
        const { status } = req.query;
        let query = { user: req.user._id }
        // let query ={ }
        // filter by interview status
        if (status === 'upcoming') {
            query.status = 'upcoming';
        }
        else if (status === 'completed') {
            query.status = 'completed';
        }
        // console.log('Query:', query);

        // get interviews from DB, sorted by dateTime
        const interviews = await Interview.find(query).sort({ dateTime: 1 })
            .populate('user', 'name email resume');

        res.status(200).json(interviews);
    }
    // handle error 
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch interviews', error: err.message })
    }
}
// mark interview as completed 
const markInterviewCompleted = async (req, res) => {

    // getting details using param and body 
    const { id } = req.params;
    const { feedback, score, result } = req.body;
    try {
        // finding interview by id 
        const interview = await Interview.findById(id);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        // update interview details
        interview.status = "completed";
        // get this detail by req body 
        interview.feedback = feedback;
        interview.score = score;
        interview.result = result;
        // saving to DB
        await interview.save();
        res.json({ message: 'Interview marked as completed', interview });
    }
    // handling error 
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}
module.exports = {
    scheduleInterview,
    getUserInterview,
    markInterviewCompleted
}