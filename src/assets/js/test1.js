export function pageVal(classname) {
   const name = document.querySelector(classname);
   let nameWidth = name.clientWidth;
   let parentWidth = name.parentNode.clientWidth;
   let moveWidth = nameWidth - parentWidth + 5;
   let page = moveWidth / 50;
   return page;
}
export function moveName(classname) {
   const name = document.querySelector(classname);
   let nameWidth = name.clientWidth;
   let parentWidth = name.parentNode.clientWidth;
   let moveWidth = nameWidth - parentWidth + 5;
   let page = moveWidth / 50;
   return function move() {
      if (nameWidth > parentWidth) {
         name.style = `transform: translateX(${-moveWidth}px);transition: all ${
            page * 1000
         }ms 2s linear;`;
         setTimeout(() => {
            name.style = '';
         }, page * 1000 + 2000 + 2000);
      }
   };
}
