
const generateUniqueId = async (Entity, Prefix) => {
   try {
      const item = await Entity.findOne({}).sort({ _id: 'desc' });

      if (!item) {
         return Prefix + '001';
      }
      else {
         let number = parseInt(item?._id?.replace(Prefix, '')) + 1;

         return Prefix + convertNumberToString(number);
      }
   } catch (error) {
      console.log(error);
   }
}

function convertNumberToString(number) {
   var stringNumber = number.toString();
   var length = stringNumber.length;

   if (length > 3) {
      return stringNumber;
   }

   return stringNumber.padStart(3, '0');
}

module.exports = generateUniqueId;