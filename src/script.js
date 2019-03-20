function loadCurrencies(){
    var from = document.getElementById("from");
    var to = document.getElementById("to");
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function(){
        if(xHttp.readyState == 4 && xHttp.status == 200)
        var obj = JSON.parse(this.responseText);
        var options = '';
            for(key in obj[0].rates){
                options = options + '<option>' + obj[0].rates[key].currency + " (" + obj[0].rates[key].code + ")" + '</option>';
            }
        from.innerHTML = options;
        to.innerHTML = options;
    }
    xHttp.open('GET','http://api.nbp.pl/api/exchangerates/tables/C',true);
    xHttp.send();
}
function convertCurrency(){
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var amount = document.getElementById("amount").value;

    if(from.length > 0 && to.length > 0 && amount.length > 0 ){
        var xHttp = new XMLHttpRequest();
        var buy = document.getElementById("buy");
        var sell = document.getElementById("sell");
        xHttp.onreadystatechange = function(){
            var obj = JSON.parse(this.responseText);
            var x = document.getElementById("from").selectedIndex;
            var y = document.getElementById("from").options;
            var z = document.getElementById("to").selectedIndex;
            var c = document.getElementById("to").options;
            var priceFromBid = parseFloat(obj[0].rates[y[x].index].bid);
            var priceToBid = parseFloat(obj[0].rates[c[z].index].bid);
            var priceFromAsk = parseFloat(obj[0].rates[y[x].index].ask);
            var priceToAsk = parseFloat(obj[0].rates[c[z].index].ask);
            var priceCurrBid = priceFromBid / priceToBid;
            var priceCurrAsk = priceFromAsk / priceToAsk;
           buy.innerHTML = Math.round(parseFloat(amount) * priceCurrBid *100)/100;
           sell.innerHTML = Math.round(parseFloat(amount) * priceCurrAsk *100)/100;
        }
        xHttp.open('GET','http://api.nbp.pl/api/exchangerates/tables/C',true);
        xHttp.send();
    }
}