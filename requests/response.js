module.exports = {
    createResponse: (data) => {
        return {
            status: 200,
            data: data,
        }
    },
    createError: (error) => {
        return {
            status: 400,
            error: error,
        }
    },
}
