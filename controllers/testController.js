const testUserController = (req,res)=>{
    try {
        res.status(200).send({
            message : "test user data api"
        })
    } catch (error) {
        console.log("Error testing API");
    }
}

module.exports = {testUserController}