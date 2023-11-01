
const randomProduct = (arr = [], n = 12) => {
   if (arr.length <= n) {
      return arr;
   }

   const shuffled = arr.slice();

   for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
   }

   return shuffled.slice(0, n);
}

module.exports = randomProduct;