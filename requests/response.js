module.exports = {
    createResponse: (data) => {
        return {
            status: 200,
            result: 1,
            data: data,
        }
    },
    createError: (error) => {
        return {
            status: 400,
            result: 0,
            error: error,
        }
    },
}
