const gb = require('./app/index');

const greenbii = new gb.greenbiisdk();
greenbii.init({api_key: "asdgfjkkglkg", access_token: "sjkshhd"}).then(r=>{
    console.log(r)
    console.log(greenbii.getStatusMessage())
}).catch(er=>{
    console.log(er);
})
