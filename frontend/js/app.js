//var numar = document.getElementById("send").addEventListener("click", sendMessage);
//console.log(numar)
//document.getElementById("send").addEventListener("click", sendMessage);
//function sendMessage() {
  //var x = document.getElementById("numar").value;
  //x = parseInt(x);
 // return x;
//}
//numar = parseInt(numar);
var app = new Vue({
  el: "#hamming-encoder",
  data: {
    //dataBits: [],
    dataBits: [],
    status: "",
    numberOfDataBits: 4 ,
  },
  created: function () {
    this.initDataBits(4);
  },
  methods: {
   // readNumar:function(){
     // $("#ok".on("click",this.readNumar))
   // },
    initDataBits: function () {
      this.dataBits = [];
      for (var i = 0; i < parseInt(this.numberOfDataBits); i++) {
        var bit = { data: null };
        this.dataBits.push(bit);
      }
    },
    send: function () {
      if (this.validate(this.dataBits) === true) {
        var encodedMessage = this.encode(this.dataBits);
        // this.status = encodedMessage + ' encoded sent to server ';
        console.log(encodedMessage, this.dataBits);
        return axios
          .put("http://localhost:3000/message", { bits: encodedMessage })
          .then((response) => (this.status = response.data));
      }
    },

    encode: function (bits) {

    var M = parseInt(bits.length);
    var c = 1;

    while (Math.pow(2,c)<(M+c+1)){
      c++;
    }
   
    
    var ar = [];
        var j = 0;
        for (var i = 1; i < M+c+1; i++) {
            if ((Math.ceil(Math.log(i) / Math.log(2))
                 - Math.floor(Math.log(i) / Math.log(2)))
                == 0) {
                ar.push(0);
            }
            else {
                ar.push((parseInt(bits[j].data)));
                j++;
            }
        }
        
        for (var i = 0; i < c; i++) {
          var x = parseInt(Math.pow(2, i)); 
          for (var j = 1; j < ar.length; j++) {
              if (((j >> i) & 1) == 1) {
                  if (x != j){
                      ar[x-1] = ar[x] ^ ar[j];
                     // console.log(ar[j-1],j-1,x-1);
                  }
              }
          }
          console.log("c"+x + " = " + ar[x-1]);
      }
      //console.log(ar);
      return ar;

/*


      // This function must be changed to allow any
      // number of data bits
      // Right now it only works for 4 data bits
      console.log("Bits", bits);
      var c4 = this.parity(
        parseInt(bits[1].data) + parseInt(bits[2].data) + parseInt(bits[3].data)
      );
      var c2 = this.parity(
        parseInt(bits[0].data) + parseInt(bits[2].data) + parseInt(bits[3].data)
      );
      var c1 = this.parity(
        parseInt(bits[0].data) + parseInt(bits[1].data) + parseInt(bits[3].data)
      );

      return [
        c1,
        c2,
        parseInt(bits[0].data),
        c4,
        parseInt(bits[1].data),
        parseInt(bits[2].data),
        parseInt(bits[3].data),
      ];*/
    },
  
    parity: function (number) {
      return number % 2;
    },
    validate: function (bits) {
      for (var i = 0; i < bits.length; i++) {
        if (this.validateBit(bits[i].data) === false) return false;
      }
      return true;
    },
    validateBit: function (character) {
      if (character === null) return false;
      return parseInt(character) === 0 || parseInt(character) === 1;
    },
  },
});
