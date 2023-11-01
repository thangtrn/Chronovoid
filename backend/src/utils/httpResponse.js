
class ttpResponse {
   constructor(res) {
      this.res = res;
   }

   Ok(metadata, message = 'Thành công!', statusCode = 200, pagination = null) {
      const json = {
         statusCode,
         message,
      }
      if (metadata != null) {
         json.metadata = metadata
      }
      if (pagination != null) {
         json.pagination = pagination
      }
      this.res.status(statusCode).json(json);
   }

   Error(message, statusCode = 500) {
      this.res.status(statusCode).json({
         statusCode: statusCode,
         message: message
      })
   }
}

module.exports = ttpResponse