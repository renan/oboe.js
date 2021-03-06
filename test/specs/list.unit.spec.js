
describe("Lists", function(){

   "use strict";
  
   var listA   = cons('a', emptyList);
   var listBA  = cons('b', listA);
   var listCBA = cons('c', listBA);  
  
   it("can use cons, head and tail", function() {
            
      expect(head(listCBA)).toBe('c');
      expect(head(tail(listCBA))).toBe('b'); 
      expect(head(tail(tail(listCBA)))).toBe('a');
   });

   if( !internetExplorer || internetExplorer >= 9 ) {

      it("freezes lists on supporting browsers", function() {   
                  
         expect( listA ).toBeFrozen();         
         expect( listBA ).toBeFrozen();         
         expect( listCBA ).toBeFrozen();                     
      })
   }
   
   it("can convert to an array", function() {
   
      var listCBA = cons('c', cons('b', cons('a', emptyList)));
      
      expect( listAsArray(listCBA) ).toEqual( ['c','b','a'] );   
   });
   
   it("can convert empty list to an array", function(){
      expect( listAsArray(emptyList) ).toEqual([]);
   });
   
   it("can reverse the order of a list", function() {
      var listCBA = cons('c', cons('b', cons('a', emptyList)));
               
      expect( listAsArray(reverseList(listCBA)) ).toEqual( ['a','b','c'] );   
   });
   
   it("can map over a list", function() {
      var naturals = cons(1, cons(2, cons(3, emptyList)));
      var evens = cons(2, cons(4, cons(6, emptyList)));
      
      function doubleit(n){return n * 2}
      
      expect( map(doubleit, naturals) ).toEqual( evens );
   });
      
   it("can convert non empty list to an array", function(){
      
      expect( listAsArray( list('a','b','c') ) ).toEqual( ['a','b','c'] );
   });
   
   it("can convert empty array to list", function() {
   
      expect( listAsArray( arrayAsList([]) ) ).toEqual( [] );
   });
   
   it("can assert every xitem in a list holds for a given test", function(){
      var l = list(1,2,3,4,5,6,7,8,9,10);
               
      function isANumber(n) {
         return typeof n == 'number';
      }
      
      function isOdd(n) {
         return n % 2 == 0;
      }
      
      function isLessThanTen(n) {
         return n < 10;
      }
      
      function isLessThanOrEqualToTen(n) {
         return n <= 10;
      }                           
      
      expect( all(isANumber,                l )).toBe(true);
      expect( all(isOdd,                    l )).toBe(false);
      expect( all(isLessThanTen,            l )).toBe(false);
      expect( all(isLessThanOrEqualToTen,   l )).toBe(true);   
   });
   
   it("can fold list where order doesnt matter", function(){
      function add(n, m){ return n+m }
      
      var sum = foldR(add, 0, list(1,2,3,4));
      
      expect( sum ).toEqual( 1 + 2 + 3 + 4 );   
   });
   
   it("can fold list where start value matters", function(){
      function divide(n, m){ return n / m }
      
      var result = foldR(divide, 100, list(2, 2));
             
      expect( result ).toBe( 25 );  //   (100/2) / 2  = 25   
   });

   it("can fold list in the correct order", function(){
      function functionString(param, fnName){ return fnName + '(' + param + ')' }
      
      var functionStringResult = foldR(functionString, 'x', list('a', 'b', 'c'));
      
      // if order were wrong, might give c(b(a(x)))
               
      expect( functionStringResult ).toEqual( 'a(b(c(x)))' );   
   });
   
   it('may apply a function with side effects to each item of a list', function(){
   
      var callback = jasmine.createSpy();
    
      each( callback, list('a','b','c','d','e','f','g') );
      
      expect(callback).toHaveBeenCalledWith('a');
      expect(callback).toHaveBeenCalledWith('b');
      expect(callback).toHaveBeenCalledWith('c');
      expect(callback).toHaveBeenCalledWith('d');
      expect(callback).toHaveBeenCalledWith('e');
      expect(callback).toHaveBeenCalledWith('f');
      expect(callback).toHaveBeenCalledWith('g');   
   });
   
   beforeEach(function(){
      this.addMatchers({
         toBeFrozen: function(){
            var obj = this.actual;
            
            return Object.isFrozen(obj);
         }   
      });
   });
});
