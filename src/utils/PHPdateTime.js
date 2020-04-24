export default function PHPdateTime(DatePattern, dataHora = null) {
    let dateTime;
    let meses = ['Jan', 'Fev', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Set', 'Out', 'Nov', 'Dez'];

    if (dataHora !== null) {
        if (typeof dataHora === "string") {
            dateTime = new Date(dataHora);
        } else{
            dateTime = dataHora;
        }
    } else {
        dateTime = new Date();
    }
    for (var i = 0; i<=DatePattern.length; i++){

        if(DatePattern.charAt(i) === 'd') DatePattern = DatePattern.replace(/d/g, Number(dateTime.getDate())<10?'0'+(dateTime.getDate()):dateTime.getDate());
        if(DatePattern.charAt(i) === 'M'){
            //DatePattern = DatePattern.replace(/m/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);
            DatePattern = DatePattern.replace(/M/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);            
        }
        if(DatePattern.charAt(i)==='Y') DatePattern = DatePattern.replace(/Y/gi, dateTime.getFullYear());
        if(DatePattern.charAt(i)==='I') DatePattern = DatePattern.replace(/I/g, Number(dateTime.getMinutes())<10?'0'+(dateTime.getMinutes()):dateTime.getMinutes());
        if(DatePattern.charAt(i)==='h') DatePattern = DatePattern.replace(/h/gi, Number(dateTime.getHours())<10?'0'+(dateTime.getHours()):dateTime.getHours());
        if(DatePattern.charAt(i)==='se') DatePattern = DatePattern.replace(/se/gi, Number(dateTime.getSeconds())<10?'0'+(dateTime.getSeconds()):dateTime.getSeconds());
        if(DatePattern.charAt(i)==='m'){
            DatePattern = DatePattern.replace(/m/g, meses[dateTime.getMonth()]);
        }
    }
    return DatePattern;
}