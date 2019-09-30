const Response = require("../lib/response_manager");
const HttpStatus = require("../constants/httpStatus");

class JobController {
    /**
     * Class Constructor
     * @param logger - winston logger
     * @param jobService
     */
    constructor(logger, jobService){
        this.logger = logger;
        this.jobService = jobService;
    }

    createJob(req, res){
        const { user, title, desc, 
            duration, skills, lowerLimitBudget, 
            upperLimitBudget
        } = req.body;

        if(!user || !title || !desc || !duration || !skills){
            return Response.failure(res, {
                message: 'Please pass all required fields(user, title, desc, duration, skills)'
            }, HttpStatus.BadRequest)
        }

        const objectToSave = {
            projectOwner: user, title, desc,
            duration, skills, lowerLimitBudget,
            upperLimitBudget
        };

        return this.jobService.saveJob(objectToSave)
            .then((response) => {
                Response.success(res, {
                    message: 'Job Saved successfully',
                    response
                }, HttpStatus.OK)
            })
            .catch((error) => {
                console.error(`An error occured while trying to save a job ${JSON.stringify(error)}`);
                Response.failure(res, {
                    message: 'Something went wrong'
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    findJob(req, res){
        const searchParams = req.query;

        return this.jobService.findJob(searchParams)
            .then((result) => {
                console.log('result', result);
                Response.success(res, {
                    message: 'Found records',
                    response: result
                }, HttpStatus.OK)
            })
            .catch((error) => {
                console.log('error occured ', error)
            });
    }
}

module.exports = JobController;
