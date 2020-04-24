export default function formatTelNumber(telNumber){
    let mascara='';
    telNumber=String(telNumber);
    for (let i = 0; i<telNumber.length; i++){
        let mask=[];
        if(telNumber.startsWith('+')){
            mask=[4,7,10];
        }else{
            mask=[3,6,9];
        }
      if((i===mask[0])||(i===mask[1]) || (i===mask[2])){
          mascara+= ' '+ telNumber[i];
      }else{
        mascara+=telNumber[i];
      }
      
    }
    return mascara;
  }