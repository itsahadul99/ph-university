
// create student in DB
const createStudent = async (req: Request, res: Response) => {
    try {
        // Validate the data using zod validation schema
        const { student } = req.body;
        const zodParsedData = studentValidationSchema.parse(student);
        // will call the service func to send this data
        const result = await StudentServices.createStudentIntoDB(zodParsedData)
        // send the res
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong.",
            error: error
        })
    }
}
// update student info in DB
const updateStudentInfo = async (req: Request, res: Response) => {
    try {
        const { student } = req.body;
        const { studentId } = req.params;
        // validate the data using zod validation schema
        const zodParsedData = updateStudentInfoValidationSchema.parse(student);
        const result = await StudentServices.updateStudentInfoInDB(studentId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "Student is updated successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong.",
            error: error
        })

    }
}